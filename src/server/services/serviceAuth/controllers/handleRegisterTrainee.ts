/* eslint-disable camelcase */
import { RequestHandler } from "express";

import { client } from "../../../PGSql/DBConnectConfig";
import { insertNewTableData } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { API_ROUTES, URL_REACT_CLIENT } from "../../apiRoutesConstants";
import { createModifiedActionResult } from "../../serviceAlerts/handleAlerts";
import { sendEmail } from "../../serviceMail/controllers/handleMailService";
import { genToken } from "../utilities/authHelpers";

export const createModifiedActionResultFun = createModifiedActionResult(
  API_ROUTES.TRAINEES_ENTITY
);

export const handleRegisterTrainee: RequestHandler = async (req, res, next) => {
  const { trainer_user_id, email, ...rest } = req.body;
  console.log(req.hostname);
  try {
    await client.query("BEGIN");

    const profile = await insertNewTableData(TABLES_DATA.PROFILES_TABLE_NAME, {
      email,
      ...rest,
    });
    console.log(profile.profile_id);

    const signUpGmailToken = genToken(
      { email, profile_id: profile.profile_id },
      process.env.ACCESS_TOKEN_SECRET,
      process.env.GMAIL_API_VERIFY_TIME
    );

    const trainee = await insertNewTableData(TABLES_DATA.TRAINEES_TABLE_NAME, {
      profile_id: profile.profile_id,
      trainer_user_id,
      sign_up_token: signUpGmailToken,
    });
    req.modifiedActionResult = createModifiedActionResultFun(
      { data: trainee, statusCode: 201, sendDataID: true },
      undefined,
      "create",
      true
    );
    console.log("profile", profile);
    console.log("trainee", trainee);

    await client.query("COMMIT");

    const link = `${URL_REACT_CLIENT}${API_ROUTES.SIGN_UP_ROUTE}/${API_ROUTES.TRAINEES_ENTITY}/${trainee.trainee_id}?verify=${signUpGmailToken}`;
    const message = {
      subject: "Welcome to My-Trainees-Management-app",
      text: `Create account in this link ${link}`,
    };
    const result = await sendEmail(email, message);
    console.log(result);
  } catch (error) {
    await client.query("ROLLBACK");
    req.modifiedActionResult = createModifiedActionResultFun(
      undefined,
      error as Error,
      "create",
      true
    );
  }
  return next();
};