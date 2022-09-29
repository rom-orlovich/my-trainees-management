/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { hash, compare } from "bcrypt";
import { update } from "lodash";
import {
  insertQueryOneItem,
  selectQuery,
  updateQuerySingleItem,
} from "../PGSql/sqlHelpers";
import { promiseHandler } from "../utilities/helpers";

import { API_ROUTES } from "../routes/apiRoutesConstants";
import { TABLES_DATA } from "../utilities/constants";
import { createModifiedActionResult } from "./handleAlerts";
import { ErrorCodes } from "./handleErrors";
import { genToken } from "./JWT";

export interface User {
  user_id: number;
  username: string;
  password: string;
}
const createModifiedActionResultFun = createModifiedActionResult(
  API_ROUTES.USER_ENTITY,
  true
);
export const registerHandler: RequestHandler = async (req, res, next) => {
  const { password } = req.body;
  const hashPassword = await hash(password, 10);
  const [user, error] = await promiseHandler(
    insertQueryOneItem(TABLES_DATA.USERS_TABLE_NAME, {
      ...req.body,
      password: hashPassword,
    })
  );
  // Continue to the alert handler.
  req.modifiedActionResult = createModifiedActionResultFun(
    { data: user, statusCode: 201 },
    error,
    "create"
  );

  return next();
};
export const resetUserDetailsNameHandler: RequestHandler = async (
  req,
  res,
  next
) => {
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
    { data: user, statusCode: 201 },
    error,
    "update"
  );

  return next();
};

export const loginHandler: RequestHandler = async (req, res, next) => {
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
        message: "User is not exist",
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
        refreshToken,
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

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "none",
  });

  return res.status(201).json({
    user: user[0].username,
    accessToken,
    message: "Login is success!",
  });
};
