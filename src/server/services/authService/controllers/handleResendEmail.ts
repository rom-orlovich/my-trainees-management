import { RequestHandler } from "webpack-dev-server";
import { client } from "../../../PGSql/DBConnectConfig";
import {
  selectQuery,
  updateQuerySingleItem,
} from "../../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../../utilities/tableDataSQL";

import { createLogAlertInfo } from "../../alertsService/handleAlerts";
import {
  createRegisterMessage,
  genToken,
  sendEmail,
} from "../utilities/authHelpers";
import { TokenType } from "./validateAuthMiddleware";

export const handleResendEmail: RequestHandler = async (req, res, next) => {
  const { profileID, traineeID } = req.query;
  console.log(traineeID);
  const logAlert = createLogAlertInfo("email");
  try {
    await client.query("BEGIN");
    const profile = await selectQuery(
      TABLES_DATA.PROFILES_TABLE_NAME,
      "email",
      `where ${TABLES_DATA.PROFILE_ID}=$1`,
      [profileID]
    );

    const { email } = profile[0];
    if (email) {
      logAlert(
        undefined,
        { message: "The trainee's profile wasn't found" },
        "get",
        true
      );
    }
    const signUpGmailToken = genToken(
      {
        email,
        profile_id: profileID,
        tokenType: TokenType.VERIFY_SIGN_UP,
      },
      process.env.ACCESS_TOKEN_SECRET,
      process.env.GMAIL_API_VERIFY_TIME || ""
    );

    const trainee = await updateQuerySingleItem(
      TABLES_DATA.TRAINEES_TABLE_NAME,
      {
        sign_up_token: signUpGmailToken,
      },
      traineeID as string,
      `where ${TABLES_DATA.TRAINEE_ID}=$1`
    );

    sendEmail(
      email,
      createRegisterMessage(traineeID as string, signUpGmailToken)
    ).catch((value) => {
      console.log(value);
    });

    req.logAlertInfo = logAlert(
      {
        data: trainee,
        statusCode: 201,
        sendDataID: false,
        message: `The register email was sent successfully to ${email} `,
      },
      undefined,
      "get",
      true
    );

    await client.query("COMMIT");
    return next();
  } catch (error) {
    await client.query("ROLLBACK");
    req.logAlertInfo = logAlert(
      undefined,
      {
        message: "Cannot resend the register email. Please try again later.",
      },
      "create",
      true
    );

    return next();
  }
};
