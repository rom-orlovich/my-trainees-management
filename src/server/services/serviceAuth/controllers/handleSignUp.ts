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
export const signUpHandlerTrainee: RequestHandler = async (req, res, next) => {
  if (req.modifiedActionResult?.error) return next();
  const { id } = req.params;
  const { password, username, email } = req.body;
  const [user, errorUser] = await createUser(
    email || "",
    username,
    password,
    "trainee",
    id
  );

  try {
    await client.query("BEGIN");
    console.log(id);
    const trainee = await updateQuerySingleItem(
      TABLES_DATA.TRAINEES_TABLE_NAME,
      { user_id: user?.user_id },
      id,
      `where ${TABLES_DATA.TRAINEE_ID}=$1`
    );

    await client.query("COMMIT");
    req.modifiedActionResult = createModifiedActionResultFun(
      {
        data: { username },
        statusCode: 201,
        messagePayload: username,
        sendDataID: true,
      },
      undefined,
      "create",
      false
    );
  } catch (error) {
    await client.query("ROLLBACK");
    req.modifiedActionResult = createModifiedActionResultFun(
      undefined,
      error as Error,
      "create",
      false
    );
  }

  // Continue to the alert handler.
  return next();
};
