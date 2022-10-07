/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { hash, compare } from "bcryptjs";

import { CookieOptions } from "express";
import { selectQuery, updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { promiseHandler } from "../../../utilities/helpers";

import { TABLES_DATA } from "../../../utilities/constants";

import {
  COOKIES_OPTIONS,
  createModifiedActionResultFun,
  EXPIRE_IN,
  genToken,
  User,
  verifyAsync,
} from "../utilities/authHelpers";

export const refreshTokenHandler: RequestHandler = async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;
  const queryLogic = "where refresh_token=$1";
  // Get the user details from the db by his username
  const [user, error] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", queryLogic, [refreshToken])
  );

  // Check if the user exist
  if (!(user && user[0]) || error) {
    return res.sendStatus(403);
  }

  const [decode, err] = await promiseHandler(
    verifyAsync(user[0].refresh_token, process.env.REFRESH_TOKEN_SECRET)
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

  const refreshToken2 = genToken(
    userSignature,
    process.env.REFRESH_TOKEN_SECRET,
    timeRemain
  );

  // eslint-disable-next-line no-unused-vars
  const [userUpdate, errorUpdate] = await promiseHandler<User[]>(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        refresh_token: refreshToken2,
      },
      refreshToken,
      queryLogic
    )
  );

  // Send refresh token
  res.cookie("refresh_token", refreshToken2, {
    maxAge: timeRemain,
    ...COOKIES_OPTIONS,
  });

  const accessToken = genToken(
    userSignature,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.EXPIRE_IN_ACCESS_TOKEN
  );

  const { password: pwd, refresh_token: refreshToken1, ...restUser } = user[0];

  // return res.status(201).json({
  //   user: restUser,
  //   accessToken,
  //   message: "Access token has create successfully!",

  // });

  req.modifiedActionResult = createModifiedActionResultFun(
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
