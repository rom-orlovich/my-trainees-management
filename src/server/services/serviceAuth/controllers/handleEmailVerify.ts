import { RequestHandler } from "webpack-dev-server";
import { selectQuery, updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";
import { API_ROUTES, URL_CUR_CLIENT } from "../../apiRoutesConstants";

import {
  prepareLogAlert,
  genToken,
  User,
  sendEmail,
} from "../utilities/authHelpers";
import { TokenType } from "./validateAuthMiddleware";

export const handleEmailVerify: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const queryLogic = `JOIN  ${TABLES_DATA.PROFILES_TABLE_NAME} as pr ON
pr.${TABLES_DATA.PROFILE_ID}=${TABLES_DATA.USERS_TABLE_NAME}.${TABLES_DATA.PROFILE_ID}
where email=$1
`;

  const [user, errorUser] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", queryLogic, [email])
  );

  if (errorUser || !(user && user[0])) {
    console.log("errorUser", errorUser);
    console.log("user", user);
    req.logAlertInfo = prepareLogAlert(
      undefined,
      {
        message: `${email} is not found`,
        // code: ErrorCodes.RESULT_NOT_FOUND,
      },
      "get",
      false
    );
    return next();
  }
  const verifyToken = genToken(
    {
      email,
      user_id: user[0].user_id,
      tokenType: TokenType.VERIFY_CHANGE_CRED,
    },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.GMAIL_API_VERIFY_TIME || ""
  );
  const [updateUser, updateError] = await promiseHandler<User>(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      { verify_token: verifyToken },
      String(user[0].user_id),
      `where ${TABLES_DATA.USERS_TABLE_ID}=$1`
    )
  );

  if (updateError || !updateUser) {
    // console.log("updateError", updateError);
    // console.log("updateUser", updateUser);
    req.logAlertInfo = prepareLogAlert(
      undefined,
      {
        message: `User update Error`,
      },
      "update",
      false
    );
    return next();
  }

  const link = `${URL_CUR_CLIENT}/users/${user[0].user_id}${API_ROUTES.CHANGE_USER_CRED_ROUTE}?verify=${verifyToken}`;

  const message = {
    subject: "Rest your password",
    text: `Enter here: ${link}`,
  };

  const sendEmailResult = await sendEmail(email, message);

  console.log(sendEmailResult);

  req.logAlertInfo = prepareLogAlert(
    { data: { email }, message: `Email was sent to ${email}`, statusCode: 200 },
    undefined,
    "get"
  );
  return next();
};
