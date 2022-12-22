/* eslint-disable no-unused-vars */

import { RequestHandler } from "express";
import {
  selectQuery,
  updateQuerySingleItem,
} from "../../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../../utilities/tableDataSQL";
import { promiseHandler } from "../../../utilities/helpers";
import { COOKIES_OPTIONS, User } from "../utilities/authHelpers";

export const logoutHandler: RequestHandler = async (req, res, next) => {
  // console.log("handle logout");
  const refreshToken = req.cookies.refresh_token;
  res.clearCookie("refresh_token", COOKIES_OPTIONS);

  const queryLogic = `where $1=some(refresh_tokens)`;

  // Get the user details from the db by his username
  let [user, error] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", queryLogic, [refreshToken])
  );
  if (!user || error) return res.status(400).json({ message: "No user" });

  [user, error] = await promiseHandler(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        refresh_tokens: user[0]?.refresh_tokens?.filter(
          (token) => token !== refreshToken
        ),
      },
      refreshToken,
      queryLogic
    )
  );

  console.log("user", user);
  if (!user || error) return res.status(400).json({ message: "No user" });

  return res.status(200).json({ message: "Logout success!" });
};
