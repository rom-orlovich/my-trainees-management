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

const createModifiedActionResultFun = createModifiedActionResult(
  API_ROUTES.USER_ENTITY,
  true
);
export const registerHandler: RequestHandler = async (req, res, next) => {
  const { password } = req.body;
  const hashPassword = await hash(password, 10);
  const [user, error] = await promiseHandler(
    insertQueryOneItem("users", { ...req.body, password: hashPassword })
  );
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
  req.modifiedActionResult = createModifiedActionResultFun(
    { data: user, statusCode: 201 },
    error,
    "update"
  );

  return next();
};

export const loginHandler: RequestHandler = async (req, res, next) => {
  const { password, username } = req.body;
  const [user, error] = await promiseHandler<
    {
      username: string;
      password: string;
    }[]
  >(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", "where username= $1", [
      username,
    ])
  );

  if (!user || error) {
    req.modifiedActionResult = createModifiedActionResultFun(undefined, {
      code: ErrorCodes.RESULT_NOT_FOUND,
      message: "User is not exist",
    });
    return next();
  }

  const hashPassword = await compare(password, user[0].password);
  console.log();
  if (!hashPassword) {
    req.modifiedActionResult = createModifiedActionResultFun(undefined, {
      code: ErrorCodes.LOGIN_FAILED,
      message: "Login has failed",
    });
    return next();
  }

  return res.status(201).send("login success");
};
