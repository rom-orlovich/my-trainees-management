/* eslint-disable no-unused-vars */

import { RequestHandler } from "webpack-dev-server";
import { client } from "../../../PGSql/DBConnectConfig";
import { updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";

import {
  createModifiedActionResultFun,
  createUser,
} from "../utilities/authHelpers";

export const signUpHandlerTrainer: RequestHandler = async (req, res, next) => {
  if (req.modifiedActionResult?.error) return next();
  const { password, username, email } = req.body;

  const [user, error] = await createUser(
    email || "",
    username,
    password,
    req.signUp_data.role
  );

  // Continue to the alert handler.
  req.modifiedActionResult = createModifiedActionResultFun(
    {
      data: { username },
      statusCode: 201,
      messagePayload: username,
      sendDataID: true,
    },
    error,
    "create",
    false
  );

  return next();
};
