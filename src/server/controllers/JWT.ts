/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { sign, verify } from "jsonwebtoken";
import { RequestHandler } from "webpack-dev-server";
import { createModifiedActionResult } from "./handleAlerts";
import { User } from "./handleAuth";

export const genToken = (user: User, key: string, expireTime = "10s") =>
  sign({ userName: user.username }, key, {
    expiresIn: expireTime,
  });

export const validateTokenMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).end();
  }
  verify(token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
    if (err) {
      res.status(403);
    }
    console.log(decode);

    const userData = decode as { username: string };
    req.auth_data = {
      jwt: token,
      user: userData?.username,
    };
    return next();
  });
};
