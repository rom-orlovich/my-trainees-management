import { compare } from "bcryptjs";
import { RequestHandler } from "express";

import {
  selectQuery,
  updateQuerySingleItem,
} from "../../../PGSql/simpleSqlQueries";

import { TABLES_DATA } from "../../../utilities/tableDataSQL";
import { promiseHandler } from "../../../utilities/helpers";
import { ErrorCodes } from "../../errorsService/errorsService";

import {
  COOKIES_OPTIONS,
  prepareLogAlert,
  EXPIRE_IN,
  genToken,
  User,
} from "../utilities/authHelpers";

export const SELECT_USER_QUERY = `LEFT JOIN ${TABLES_DATA.TRAINEES_TABLE_NAME} as tr ON 
tr.${TABLES_DATA.USERS_TABLE_ID}= us.${TABLES_DATA.USERS_TABLE_ID}`;
export const USER_TABLE_ALIAS_US = `${TABLES_DATA.USERS_TABLE_NAME} as us`;
export const USER_TABLE_RETURN_FIELDS = `us.*,tr.${TABLES_DATA.TRAINEE_ID} ,tr.trainer_user_id`;

export const loginHandler: RequestHandler = async (req, res, next) => {
  if (req.logAlertInfo?.error) return next();
  const preRefreshToken = req.cookies.refresh_token;
  res.clearCookie("refresh_token", COOKIES_OPTIONS);
  const { password, username } = req.body;
  const queryLogic = `WHERE username=$1`;
  // Get the user details from the db by his username
  const [user, error] = await promiseHandler<User[]>(
    selectQuery(
      USER_TABLE_ALIAS_US,
      USER_TABLE_RETURN_FIELDS,
      `${SELECT_USER_QUERY} ${queryLogic}`,
      [username]
    )
  );

  // Check if the user exist
  if (!(user && user.length > 0) || error) {
    req.logAlertInfo = prepareLogAlert(
      undefined,
      error || {
        code: ErrorCodes.RESULT_NOT_FOUND,
        message: `User ${username} does not exist`,
      },
      "get",
      false
    );
    // Continue to the alert handler.
    return next();
  }

  const hashPassword = await compare(password, user[0].password);

  // Check if the password from the client is fit to the hash password in the db.
  if (!hashPassword) {
    req.logAlertInfo = prepareLogAlert(
      undefined,
      {
        code: ErrorCodes.LOGIN_FAILED,
        message: "Login has failed. Username or password are not correct.",
      },
      "create",
      false
    );
    // Continue to the alert handler.
    return next();
  }

  // Generate tokens
  const userSignature = {
    role: user[0].role,
    user_id: user[0].user_id,

    username: user[0].username,
  };

  const accessToken = genToken(
    userSignature,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.EXPIRE_IN_ACCESS_TOKEN
  );

  const refreshToken = genToken(
    userSignature,
    process.env.REFRESH_TOKEN_SECRET,
    process.env.EXPIRE_IN_REFRESH_TOKEN
  );

  // Replace the previous refresh token of the same device by new one.
  // eslint-disable-next-line no-unused-vars
  const [userUpdate, errorUpdate] = await promiseHandler<User[]>(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        refresh_tokens: [
          ...user[0].refresh_tokens.filter(
            (token) => token !== preRefreshToken
          ),
          refreshToken,
        ],
      },
      username,
      queryLogic
    )
  );

  // Check if there some error in updating the refresh token of user.
  if (errorUpdate) {
    req.logAlertInfo = prepareLogAlert(undefined, errorUpdate, "update");
    // Continue to the alert handler.
    return next();
  }

  // Send refresh token
  res.cookie("refresh_token", refreshToken, {
    maxAge: EXPIRE_IN,
    ...COOKIES_OPTIONS,
  });

  req.auth_data = {
    ...userSignature,
    jwt: accessToken,
  };
  const message = "Login is success!";

  console.log("user[0]", user[0]);
  const {
    password: pwd,
    refresh_tokens: refreshTokenArr,
    ...restUser
  } = user[0];

  req.logAlertInfo = prepareLogAlert(
    {
      message,
      data: {
        user: restUser,
        accessToken,
        message,
      },
      statusCode: 201,
    },
    errorUpdate
  );
  return next(); // Continue to the alert handler.
};
