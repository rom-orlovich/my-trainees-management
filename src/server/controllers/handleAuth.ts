/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { hash, compare } from "bcrypt";
import { insertQueryOneItem, selectQuery } from "../PGSql/sqlHelpers";
import { promiseHandler } from "../utilities/helpers";

import { API_ROUTES } from "../routes/apiRoutesConstants";
import { TABLES_DATA } from "../utilities/constants";
import { createModifiedActionResult } from "./handleAlerts";

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

export const loginHandler: RequestHandler = async (req, res, next) => {
  const { password, username } = req.body;
  const [user, error] = await promiseHandler(
    selectQuery(
      TABLES_DATA.USERS_TABLE_NAME,
      "*",
      "where username=$1",
      username
    )
  );
  // if (!user || error) {

  //   next()
  // }

  // const hashPassword = await compare(password, 10);
  // const [user, error] = await promiseHandler(
  //   insertQueryOneItem("users", { ...req.body, password: hashPassword })
  // );
  req.modifiedActionResult = createModifiedActionResultFun(
    { data: user },
    error,
    "create"
  );

  return next();
};
