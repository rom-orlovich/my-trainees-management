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
  genToken,
  User,
  verifyAsync,
} from "../utilities/authHelpers";

export const refreshTokenHandler: RequestHandler = async (req, res, next) => {
  console.log("handle refresh");
  const preRefreshToken = req.cookies.refresh_token;
  // console.log("preRefreshToken", preRefreshToken);
  const queryLogic = "where $1=some(refresh_tokens)";
  // Get the user details from the db by his username
  const [user, error] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", queryLogic, [
      preRefreshToken,
    ])
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
    console.log("userUpdate", userUpdate);
    console.log("errorUpdate", errorUpdate);
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

  const nonPreRefreshTokens = user[0].refresh_tokens.filter(
    (token) => token !== preRefreshToken
  );
  // console.info("username", user[0].username);
  // console.log("preRefreshToken", preRefreshToken);
  // console.log("newRefreshToken", newRefreshToken);

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
    req.modifiedActionResult = createModifiedActionResultFun(
      undefined,
      errorUpdate,
      "update",
      false
    );
    console.log("userUpdate", userUpdate);
    console.log("errorUpdate", errorUpdate);
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

  console.log(user[0]);
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