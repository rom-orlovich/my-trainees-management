/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { hash, compare } from "bcrypt";
import { update } from "lodash";
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
}
const createModifiedActionResultFun = createModifiedActionResult(
  API_ROUTES.USER_ENTITY
);

export const registerHandler: RequestHandler = async (req, res, next) => {
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
      data: user ? user[0].username : undefined,
      statusCode: 201,
      messagePayload: username,
    },
    error,
    "create"
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

  // Get the user details from the db by his username
  const [user, error] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", "where username= $1", [
      username,
    ])
  );

  // Check if the user exist
  if (!user || error) {
    req.modifiedActionResult = createModifiedActionResultFun(
      undefined,
      error || {
        code: ErrorCodes.RESULT_NOT_FOUND,
        message: `User ${username} does not exist`,
      }
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

  const [userUpdate, errorUpdate] = await promiseHandler(
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
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });

  return res.status(201).json({
    user: user[0].username,
    accessToken,
    message: "Login is success!",
  });
};

export const refreshTokenHandler: RequestHandler = async (req, res, next) => {
  const cookie = req.cookies;

  const refreshToken = cookie.refresh_token;
  if (!refreshToken) {
    return res.sendStatus(401);
  }

  // Get the user details from the db by his username
  const [user, error] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", "where refresh_token= $1", [
      refreshToken,
    ])
  );

  // Check if the user exist
  if (!(user && user[0]) || error) {
    return res.sendStatus(403);
  }

  const [decode, err] = await promiseHandler(
    verifyAsync(refreshToken, process.env.REFRESH_TOKEN_SECRET)
  );
  const userData = decode as { username: string };

  if (err || userData.username !== user[0].username) {
    return res.sendStatus(401);
  }

  const accessToken = genToken(
    user[0],
    process.env.ACCESS_TOKEN_SECRET,
    process.env.EXPIRE_IN_ACCESS_TOKEN
  );

  return res.status(201).json({
    username: user[0].username,
    accessToken,
    message: "Access token has create successfully!",
  });
};

export const logoutHandler: RequestHandler = async (req, res, next) => {
  const cookie = req.cookies;
  const refreshToken = cookie.refresh_token;

  if (!refreshToken) {
    return res.status(200).json({ message: "Logout success!" });
  }

  const queryLogic = `WHERE refresh_token=$1`;

  const [userUpdate, errorUpdate] = await promiseHandler(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        refresh_token: "",
      },
      refreshToken,
      queryLogic
    )
  );

  if (errorUpdate || !userUpdate)
    return res.status(400).json({ message: "No user" });

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logout success!" });
};
