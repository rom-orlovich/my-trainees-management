/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";
import { client } from "../../../PGSql/DBConnectConfig";
import { updateQuerySingleItem } from "../../../PGSql/simpleSqlQueries";

import { TABLES_DATA } from "../../../utilities/constants";
import { createUser } from "../utilities/authHelpers";
import { prepareLogAlert } from "./handleRegisterTrainee";

export const signUpHandlerTrainee: RequestHandler = async (req, res, next) => {
  if (req.logAlertInfo?.error) return next();
  const { profileID } = req.params;
  const { password, username, email } = req.body;
  const [user, errorUser] = await createUser(
    email || "",
    username,
    password,
    "trainee",
    profileID
  );
  if (errorUser) {
    console.log("errorUser", errorUser);
    req.logAlertInfo = prepareLogAlert(undefined, errorUser, "create", false);
    return next();
  }

  try {
    await client.query("BEGIN");

    const trainee = await updateQuerySingleItem(
      TABLES_DATA.TRAINEES_TABLE_NAME,
      { user_id: user?.user_id, sign_up_token: "" },
      profileID,
      `where ${TABLES_DATA.PROFILE_ID}=$1`
    );

    await client.query("COMMIT");

    req.logAlertInfo = prepareLogAlert(
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
    req.logAlertInfo = prepareLogAlert(
      undefined,
      error as Error,
      "create",
      false
    );
  }

  // Continue to the alert handler.
  return next();
};
