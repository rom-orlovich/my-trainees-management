/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { hash, compare } from "bcryptjs";

import { CookieOptions } from "express";
import { selectQuery, updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { promiseHandler } from "../../../utilities/helpers";

import { TABLES_DATA } from "../../../utilities/constants";

import {
  COOKIES_OPTIONS,
  prepareLogAlert,
  genToken,
  User,
  verifyAsync,
} from "../utilities/authHelpers";
import {
  SELECT_USER_QUERY,
  USER_TABLE_ALIAS_US,
  USER_TABLE_RETURN_FIELDS,
} from "./handleLogin";

export const refreshTokenHandler: RequestHandler = async (req, res, next) => {
  console.log("handle refresh");
  const preRefreshToken = req.cookies.refresh_token;
  res.clearCookie("refresh_token", COOKIES_OPTIONS);

  const queryLogic = "where $1=some(refresh_tokens)";
  // Get the user details from the db by his username
  const [user, error] = await promiseHandler<User[]>(
    selectQuery(
      USER_TABLE_ALIAS_US,
      USER_TABLE_RETURN_FIELDS,
      `${SELECT_USER_QUERY} ${queryLogic}`,
      [preRefreshToken]
    )
  );

  // Check if the user exist
  if (!(user && user[0]) || error) {
    const [userUpdate, errorUpdate] = await promiseHandler(
      updateQuerySingleItem(
        TABLES_DATA.USERS_TABLE_NAME,
        {
          refresh_tokens: [],
        },
        preRefreshToken,
        queryLogic
      )
    );

    return res.sendStatus(403);
  }

  const [decode, err] = await promiseHandler(
    verifyAsync(preRefreshToken, process.env.REFRESH_TOKEN_SECRET)
  );

  if (err) {
    return res.sendStatus(401);
  }

  const Decode = decode as { exp: number; iat: number };

  const userSignature = {
    role: user[0].role,
    user_id: user[0].user_id,
    username: user[0].username,
  };
  const timeRemain = Math.floor(Decode.exp - new Date().getTime() / 1000);

  const newRefreshToken = genToken(
    userSignature,
    process.env.REFRESH_TOKEN_SECRET,
    timeRemain
  );

  const nonPreRefreshTokens = user[0]?.refresh_tokens?.filter(
    (token) => token !== preRefreshToken
  );

  // eslint-disable-next-line no-unused-vars
  const [userUpdate, errorUpdate] = await promiseHandler<User[]>(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        refresh_tokens: [...nonPreRefreshTokens, newRefreshToken],
      },
      preRefreshToken,
      queryLogic
    )
  );
  if (!userUpdate || errorUpdate) {
    req.logAlertInfo = prepareLogAlert(undefined, errorUpdate, "update", false);

    return next();
  }

  // Send refresh token

  res.cookie("refresh_token", newRefreshToken, {
    maxAge: timeRemain * 1000,
    ...COOKIES_OPTIONS,
  });

  const accessToken = genToken(
    userSignature,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.EXPIRE_IN_ACCESS_TOKEN
  );

  const { password: pwd, refresh_tokens: refreshToken1, ...restUser } = user[0];

  req.logAlertInfo = prepareLogAlert(
    {
      message: "Access token has create successfully!",

      data: {
        user: restUser,
        accessToken,
        message: "Access token has create successfully!",
      },
      statusCode: 201,
    },
    undefined,
    "create",
    false
  );
  return next(); // Continue to the alert handler.
};
