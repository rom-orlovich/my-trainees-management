import { RequestHandler } from "webpack-dev-server";
import { selectQuery } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";
import { createModifiedActionResultFun, User } from "../utilities/authHelpers";

export const handleEmailVerify: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const queryLogic = `JOIN ${TABLES_DATA.PROFILES_TABLE_NAME} as pr ON 
pr.${TABLES_DATA.PROFILE_ID}=${TABLES_DATA.USERS_TABLE_NAME}.${TABLES_DATA.PROFILE_ID}
where email=$1
`;

  const [user, errorUser] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", queryLogic, [email])
  );

  if (errorUser || !(user && user[0])) {
    req.modifiedActionResult = createModifiedActionResultFun(
      undefined,
      {
        message: `${email} is not found`,
      },
      "get",
      false
    );
    return next();
  }
  req.modifiedActionResult = createModifiedActionResultFun(
    { data: email, message: `Email was sent to ${email}`, statusCode: 200 },
    undefined,
    "get"
  );
  return next();
};
