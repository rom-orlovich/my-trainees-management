/* eslint-disable camelcase */
import { RequestHandler } from "express";

import { client } from "../../../PGSql/DBConnectConfig";
import { insertNewTableData } from "../../../PGSql/complexSqlQueries";
import { TABLES_DATA } from "../../../utilities/constants";
import { API_ROUTES } from "../../apiRoutesConstants";
import { createLogAlertInfo } from "../../alertsService/handleAlerts";

import {
  createRegisterMessage,
  genToken,
  sendEmail,
} from "../utilities/authHelpers";
import { TokenType } from "./validateAuthMiddleware";

export const prepareLogAlert = createLogAlertInfo(API_ROUTES.TRAINEES_ENTITY);

export const handleRegisterTrainee: RequestHandler = async (req, res, next) => {
  const { trainer_user_id, email, ...rest } = req.body;

  try {
    await client.query("BEGIN");

    const profile = await insertNewTableData(TABLES_DATA.PROFILES_TABLE_NAME, {
      email,
      ...rest,
    });

    const signUpGmailToken = genToken(
      {
        email,
        profile_id: profile.profile_id,
        tokenType: TokenType.VERIFY_SIGN_UP,
      },
      process.env.ACCESS_TOKEN_SECRET,
      process.env.GMAIL_API_VERIFY_TIME || ""
    );

    const trainee = await insertNewTableData(TABLES_DATA.TRAINEES_TABLE_NAME, {
      profile_id: profile.profile_id,
      trainer_user_id,
      sign_up_token: signUpGmailToken,
    });
    req.logAlertInfo = prepareLogAlert(
      { data: trainee, statusCode: 201, sendDataID: true },
      undefined,
      "create",
      true
    );

    await client.query("COMMIT");

    sendEmail(
      email,
      createRegisterMessage(trainee.trainee_id, signUpGmailToken)
    ).catch((value) => {
      console.log(value);
    });
  } catch (error) {
    await client.query("ROLLBACK");
    req.logAlertInfo = prepareLogAlert(
      undefined,
      error as Error,
      "create",
      true
    );
  }
  return next();
};
