/* eslint-disable no-unused-vars */
import { compare, hash } from "bcryptjs";
import { RequestHandler } from "webpack-dev-server";
import { insertQueryOneItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";

import { createModifiedActionResultFun, User } from "../utilities/authHelpers";

export const signUpHandler: RequestHandler = async (req, res, next) => {
  if (req.modifiedActionResult?.error) return next();
  const { password, username } = req.body;
  const hashPassword = await hash(password, 10);
  const [user, error] = await promiseHandler<User[]>(
    insertQueryOneItem(TABLES_DATA.USERS_TABLE_NAME, {
      ...req.body,
      role: req.signUp_data.role,
      password: hashPassword,
    })
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
