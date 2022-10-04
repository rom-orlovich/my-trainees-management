/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { hash, compare } from "bcrypt";
import { update } from "lodash";
import { CookieOptions } from "express";
import {
  insertQueryOneItem,
  selectQuery,
  updateQuerySingleItem,
} from "../../../PGSql/sqlHelpers";
import { promiseHandler } from "../../../utilities/helpers";

import { API_ROUTES } from "../../apiRoutesConstants";
import { TABLES_DATA } from "../../../utilities/constants";
import { createModifiedActionResult } from "../../serviceAlerts/handleAlerts";
import { ErrorCodes } from "../../serviceErrors/handleErrors";
import { genToken, verifyAsync } from "../JWT";

export interface User {
  user_id: number;
  username: string;
  password: string;
  refresh_token: string;
}
const EXPIRE_AT =
  1000 * 60 * Number(process.env.EXPIRE_IN_ACCESS_TOKEN.slice(0, -1));
const createModifiedActionResultFun = createModifiedActionResult(
  API_ROUTES.USER_ENTITY
);
const COOKIES_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

export const signUpHandler: RequestHandler = async (req, res, next) => {
  if (req.modifiedActionResult?.error) return next();
  const { password, username } = req.body;
  const hashPassword = await hash(password, 10);
  const [user, error] = await promiseHandler<User[]>(
    insertQueryOneItem(TABLES_DATA.USERS_TABLE_NAME, {
      ...req.body,
      password: hashPassword,
    })
  );
  // Continue to the alert handler.
  req.modifiedActionResult = createModifiedActionResultFun(
    {
      data: user,
      statusCode: 201,
      messagePayload: username,
    },
    error,
    "create",
    false
  );

  return next();
};
export const changeUserCredentialsHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  if (req.modifiedActionResult?.error) return next();
  const { id } = req.params;
  const queryLogic = `WHERE ${TABLES_DATA.USERS_TABLE_ID}=$1`;
  const { password } = req.body;
  const hashPassword = await hash(password, 10);
  const [user, error] = await promiseHandler(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        ...req.body,
        password: hashPassword,
      },
      id,
      queryLogic
    )
  );
  // Continue to the alert handler.
  req.modifiedActionResult = createModifiedActionResultFun(
    {
      data: user ? user[0].username : undefined,
      statusCode: 201,
      messagePayload: req.auth_data.username,
    },
    error,
    "update"
  );

  return next();
};

export const loginHandler: RequestHandler = async (req, res, next) => {
  if (req.modifiedActionResult?.error) return next();
  const { password, username } = req.body;
  // await createAdmin(username, password);
  // Get the user details from the db by his username
  const [user, error] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", "where username= $1", [
      username,
    ])
  );

  // Check if the user exist
  if (!(user && user.length > 0) || error) {
    req.modifiedActionResult = createModifiedActionResultFun(
      undefined,
      error || {
        code: ErrorCodes.RESULT_NOT_FOUND,
        message: `User ${username} does not exist`,
      },
      "get",
      false
    );
    // Continue to the alert handler.
    return next();
  }

  const hashPassword = await compare(password, user[0].password);

  // Check if the password from the client is fit to the hash password in the db.
  if (!hashPassword) {
    req.modifiedActionResult = createModifiedActionResultFun(undefined, {
      code: ErrorCodes.LOGIN_FAILED,
      message: "Login has failed",
    });
    return next();
  }

  const accessToken = genToken(
    user[0],
    process.env.ACCESS_TOKEN_SECRET,
    process.env.EXPIRE_IN_ACCESS_TOKEN
  );
  const refreshToken = genToken(
    user[0],
    process.env.REFRESH_TOKEN_SECRET,
    process.env.EXPIRE_IN_REFRESH_TOKEN
  );
  const queryLogic = `WHERE ${TABLES_DATA.USERS_TABLE_ID}=$1`;

  const [userUpdate, errorUpdate] = await promiseHandler<User[]>(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        ...user[0],
        refresh_token: refreshToken,
      },
      String(user[0].user_id),
      queryLogic
    )
  );

  // Check if there some error in updating the refresh token of user.
  if (errorUpdate) {
    req.modifiedActionResult = createModifiedActionResultFun(
      undefined,
      errorUpdate,
      "update"
    );
    return next();
  }

  // Send refresh token
  res.cookie("access_token", accessToken, {
    maxAge: EXPIRE_AT,
    ...COOKIES_OPTIONS,
  });

  const { password: pwd, refresh_token: refreshToken1, ...restUser } = user[0];

  return res.status(201).json({
    user: restUser,
    expireAt: EXPIRE_AT,
    message: "Login is success!",
  });
};

export const refreshTokenHandler: RequestHandler = async (req, res, next) => {
  const authData = req.auth_data;
  console.log(authData);
  // if (!authData.) {
  //   return res.sendStatus(401);
  // }

  // Get the user details from the db by his username
  const [user, error] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", "where username= $1", [
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
  // const userData = decode as { username: string };

  if (
    err
    // || userData.username !== user[0].username
  ) {
    return res.sendStatus(401);
  }

  const accessToken = genToken(
    user[0],
    process.env.ACCESS_TOKEN_SECRET,
    process.env.EXPIRE_IN_ACCESS_TOKEN
  );

  // Send refresh token
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: EXPIRE_AT,
  });

  return res.status(201).json({
    user: user[0],
    expireAt: EXPIRE_AT,
    message: "Access token has create successfully!",
  });
};

export const logoutHandler: RequestHandler = async (req, res, next) => {
  // const cookie = req.cookies;
  // const refreshToken = cookie.refresh_token;
  const authData = req.auth_data;

  // if (!refreshToken) {
  //   return res.status(200).json({ message: "Logout success!" });
  // }

  const queryLogic = `WHERE username=$1`;

  const [userUpdate, errorUpdate] = await promiseHandler(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        refresh_token: "",
      },
      authData.username,
      queryLogic
    )
  );

  if (errorUpdate || !userUpdate)
    return res.status(400).json({ message: "No user" });

  res.clearCookie("access_token", COOKIES_OPTIONS);

  return res.status(200).json({ message: "Logout success!" });
};
