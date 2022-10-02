/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import { JwtPayload, sign, verify } from "jsonwebtoken";
import { RequestHandler } from "webpack-dev-server";
import { promiseHandler } from "../../utilities/helpers";
import { User } from "./controllers/handleAuth";

export function verifyAsync(
  token: string,
  key: string
): Promise<string | JwtPayload | undefined> {
  return new Promise((res, reject) => {
    verify(token, key, (err, decode) => {
      if (err) reject(err);
      res(decode);
    });
  });
}

export const genToken = (user: User, key: string, expireTime = "10s") =>
  sign({ username: user.username }, key, {
    expiresIn: expireTime,
  });

export const validateTokenMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  const [decode, err] = await promiseHandler(
    verifyAsync(token, process.env.ACCESS_TOKEN_SECRET)
  );

  if (err) return res.sendStatus(403);

  const userData = decode as { username: string };
  req.auth_data = {
    jwt: token,
    username: userData?.username,
  };

  return next();
};
