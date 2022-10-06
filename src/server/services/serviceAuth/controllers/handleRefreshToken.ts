/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { hash, compare } from "bcryptjs";

import { CookieOptions } from "express";
import { selectQuery } from "../../../PGSql/sqlHelpers";
import { promiseHandler } from "../../../utilities/helpers";

import { TABLES_DATA } from "../../../utilities/constants";

import {
  EXPIRE_IN,
  genToken,
  REFRESH_IN,
  User,
  verifyAsync,
} from "../utilities/utilities";

export const refreshTokenHandler: RequestHandler = async (req, res, next) => {
  const authData = req.auth_data;

  // Get the user details from the db by his username
  const [user, error] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", "where username=$1", [
      authData.username,
    ])
  );

  // Check if the user exist
  if (!(user && user[0]) || error) {
    return res.sendStatus(403);
  }

  const [decode, err] = await promiseHandler(
    verifyAsync(user[0].refresh_token, process.env.REFRESH_TOKEN_SECRET)
  );

  if (err) {
    return res.sendStatus(401);
  }
  const userSignature = {
    role: user[0].role,
    user_id: user[0].user_id,
    username: user[0].username,
  };

  const accessToken = genToken(
    userSignature,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.EXPIRE_IN_ACCESS_TOKEN
  );

  // Send refresh token
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: EXPIRE_IN,
  });

  console.log("user login current data", user[0]);

  const { password: pwd, refresh_token: refreshToken1, ...restUser } = user[0];

  return res.status(201).json({
    user: restUser,
    expireAt: REFRESH_IN,
    message: "Access token has create successfully!",
  });
};
