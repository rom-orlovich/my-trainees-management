/* eslint-disable no-unused-vars */
import { compare } from "bcryptjs";
import { RequestHandler } from "webpack-dev-server";
import { selectQuery, updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";
import { ErrorCodes } from "../../serviceErrors/handleErrors";

import { COOKIES_OPTIONS } from "../utilities/authHelpers";

export const logoutHandler: RequestHandler = async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;

  const queryLogic = `WHERE refresh_token=$1`;

  const [userUpdate, errorUpdate] = await promiseHandler(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        refresh_token: "",
      },
      refreshToken,
      queryLogic
    )
  );

  if (errorUpdate || !userUpdate)
    return res.status(400).json({ message: "No user" });

  res.clearCookie("refresh_token", COOKIES_OPTIONS);

  return res.status(200).json({ message: "Logout success!" });
};
