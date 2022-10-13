import { RequestHandler } from "webpack-dev-server";
import { updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";
import { API_ROUTES, URL_CUR_CLIENT } from "../../apiRoutesConstants";

import { sendEmail } from "../../serviceMail/controllers/handleMailService";
import {
  createModifiedActionResultFun,
  genToken,
  User,
} from "../utilities/authHelpers";

export const handleEmailVerify: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const queryLogic = `JOIN ${TABLES_DATA.PROFILES_TABLE_NAME} as pr ON 
pr.${TABLES_DATA.PROFILE_ID}=${TABLES_DATA.USERS_TABLE_NAME}.${TABLES_DATA.PROFILE_ID}
where email=$1
`;

  const verifyToken = genToken(
    { email },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.GMAIL_API_VERIFY_TIME || ""
  );

  const [user, errorUser] = await promiseHandler<User[]>(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      { verify_token: verifyToken },
      queryLogic,
      email
    )
  );

  if (errorUser || !(user && user[0])) {
    req.modifiedActionResult = createModifiedActionResultFun(
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

  const link = `${URL_CUR_CLIENT}/users/${user[0].user_id}/${API_ROUTES.CHANGE_USER_CRED_ROUTE}?verify=${verifyToken}`;

  const message = {
    text: "Rest your password",
    subject: `Enter here: ${link}`,
  };
  // eslint-disable-next-line no-unused-vars
  const sendEmailResult = sendEmail(email, message).then(console.log);

  req.modifiedActionResult = createModifiedActionResultFun(
    { data: email, message: `Email was sent to ${email}`, statusCode: 200 },
    undefined,
    "get"
  );
  return next();
};
