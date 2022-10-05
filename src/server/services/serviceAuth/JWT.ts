/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import { JwtPayload, sign, verify } from "jsonwebtoken";
import { RequestHandler } from "webpack-dev-server";
import { promiseHandler } from "../../utilities/helpers";
import { User, UserRoles } from "./controllers/handleAuth";

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

export const genToken = (
  obj: Record<string, any>,
  key: string,
  expireTime = "10s"
) =>
  sign(obj, key, {
    expiresIn: expireTime,
  });

export const validateTokenMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) return res.sendStatus(401);

  const [decode, err] = await promiseHandler(
    verifyAsync(accessToken, process.env.ACCESS_TOKEN_SECRET)
  );

  if (err) {
    console.log("err-tokens check", err);
    return res.sendStatus(403);
  }

  const userData = decode as {
    username: string;
    user_id: number;
    role: UserRoles;
  };

  req.auth_data = {
    jwt: accessToken,
    username: userData?.username,
    user_id: userData?.user_id,
    role: userData.role,
  };

  return next();
};
