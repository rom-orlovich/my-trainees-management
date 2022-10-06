import { compare } from "bcryptjs";
import { RequestHandler } from "webpack-dev-server";
import { selectQuery, updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";
import { ErrorCodes } from "../../serviceErrors/handleErrors";

import {
  COOKIES_OPTIONS,
  createModifiedActionResultFun,
  EXPIRE_IN,
  genToken,
  REFRESH_IN,
  User,
} from "../utilities/authHelpers";

export const loginHandler: RequestHandler = async (req, res, next) => {
  if (req.modifiedActionResult?.error) return next();
  const { password, username } = req.body;

  // Get the user details from the db by his username
  const [user, error] = await promiseHandler<User[]>(
    selectQuery(TABLES_DATA.USERS_TABLE_NAME, "*", "where username= $1", [
      username,
    ])
  );

  // Check if the user exist
  if (!(user && user.length > 0) || error) {
    req.modifiedActionResult = createModifiedActionResultFun(
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
    req.modifiedActionResult = createModifiedActionResultFun(undefined, {
      code: ErrorCodes.LOGIN_FAILED,
      message: "Login has failed",
    });
    return next();
  }
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

  // const hash2=await hash(process.env.REFRESH_TOKEN_SECRET, 10);
  const refreshToken = genToken(
    userSignature,
    process.env.REFRESH_TOKEN_SECRET,
    process.env.EXPIRE_IN_REFRESH_TOKEN
  );
  const queryLogic = `WHERE ${TABLES_DATA.USERS_TABLE_ID}=$1`;

  // eslint-disable-next-line no-unused-vars
  const [userUpdate, errorUpdate] = await promiseHandler<User[]>(
    updateQuerySingleItem(
      TABLES_DATA.USERS_TABLE_NAME,
      {
        ...user[0],
        refresh_token: refreshToken,
      },
      String(user[0].user_id),
      queryLogic
    )
  );

  // Check if there some error in updating the refresh token of user.
  if (errorUpdate) {
    req.modifiedActionResult = createModifiedActionResultFun(
      undefined,
      errorUpdate,
      "update"
    );
    return next();
  }

  // Send refresh token
  res.cookie("access_token", accessToken, {
    maxAge: EXPIRE_IN,
    ...COOKIES_OPTIONS,
  });

  const { password: pwd, refresh_token: refreshToken1, ...restUser } = user[0];

  req.auth_data = {
    ...userSignature,
    jwt: accessToken,
  };

  req.modifiedActionResult = createModifiedActionResultFun(
    {
      message: "Login is success!",
      data: {
        user: restUser,
        expireAt: REFRESH_IN,
        message: "Login is success!",
      },
      statusCode: 201,
    },
    errorUpdate
  );
  return next();
};
