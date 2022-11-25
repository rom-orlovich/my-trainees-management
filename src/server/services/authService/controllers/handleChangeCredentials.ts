import { hash } from "bcryptjs";
import { RequestHandler } from "webpack-dev-server";
import { updateQuerySingleItem } from "../../../PGSql/simpleSqlQueries";

import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";

import { prepareLogAlert } from "../utilities/authHelpers";

export const changeUserCredentialsHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  if (req.logAlertInfo?.error) return next();
  const { userID } = req.params;
  const queryLogic = `WHERE ${TABLES_DATA.USERS_TABLE_ID}=$1`;
  const { password } = req.body;
  const hashPassword = await hash(password, 10);
  const [user, error] = await promiseHandler(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        ...req.body,
        password: hashPassword,
        verify_token: "",
      },
      userID,
      queryLogic
    )
  );
  // Continue to the alert handler.
  req.logAlertInfo = prepareLogAlert(
    {
      data: user ? user.username : undefined,
      statusCode: 201,
      messagePayload: req?.auth_data?.username || "",
    },
    error,
    "update"
  );

  return next();
};
