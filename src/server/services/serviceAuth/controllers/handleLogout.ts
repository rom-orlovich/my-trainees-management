/* eslint-disable no-unused-vars */
import { compare } from "bcryptjs";
import { RequestHandler } from "webpack-dev-server";
import { selectQuery, updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";
import { ErrorCodes } from "../../serviceErrors/handleErrors";
import { genToken } from "../JWT";
import {
  COOKIES_OPTIONS,
  createModifiedActionResultFun,
  EXPIRE_IN,
  REFRESH_IN,
  User,
} from "./handleAuth";

export const logoutHandler: RequestHandler = async (req, res, next) => {
  const authData = req.auth_data;

  const queryLogic = `WHERE username=$1`;

  const [userUpdate, errorUpdate] = await promiseHandler(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        refresh_token: "",
      },
      authData.username,
      queryLogic
    )
  );

  if (errorUpdate || !userUpdate)
    return res.status(400).json({ message: "No user" });

  res.clearCookie("access_token", COOKIES_OPTIONS);

  return res.status(200).json({ message: "Logout success!" });
};
