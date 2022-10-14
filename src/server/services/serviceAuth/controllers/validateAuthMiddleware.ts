/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
// eslint-disable-next-line no-unused-vars
import { selectQuery, updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";
import { Permissions, PermissionsRolesType } from "../../usersPermission";

import { UserRoles, verifyAsync } from "../utilities/authHelpers";

export enum TokenType {
  VERIFY_SIGN_UP = 1,
  VERIFY_CHANGE_CRED = 2,
}
const checkTraineeHaveToken = async (token: string, profileID: number) => {
  // eslint-disable-next-line no-unused-vars
  const [trainee, errorTrainee] = await promiseHandler(
    selectQuery(
      TABLES_DATA.TRAINEES_TABLE_NAME,
      "*",
      `where sign_up_token=$1 and profile_id=$2`,
      [token, profileID]
    )
  );
  if (errorTrainee) return false;

  return trainee && trainee[0];
};
const checkUsersHaveToken = async (token: string, userID: number) => {
  // eslint-disable-next-line no-unused-vars
  const [user, errorUser] = await promiseHandler(
    selectQuery(
      TABLES_DATA.USERS_TABLE_NAME,
      "*",
      `where verify_token=$1 and user_id=$2`,
      [token, userID]
    )
  );
  if (errorUser) return false;

  return user && user[0];
};

export const validateTokenMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const accessToken = req.headers.authorization?.split("Bearer ")[1];
  console.log(accessToken);

  if (!accessToken) {
    return res.sendStatus(401);
  }
  const [decode, err] = await promiseHandler(
    verifyAsync(accessToken, process.env.ACCESS_TOKEN_SECRET)
  );
  const Decode = decode as Record<string, any>;

  if (Decode?.profile_id && Decode.tokenType === TokenType.VERIFY_SIGN_UP) {
    if (await checkTraineeHaveToken(accessToken, Decode?.profile_id)) {
      req.signUp_data = {
        role: "trainer",
      };
      return next();
    }
    return res.sendStatus(401);
  }

  if (Decode?.user_id && Decode.tokenType === TokenType.VERIFY_CHANGE_CRED) {
    if (await checkUsersHaveToken(accessToken, Decode?.user_id)) {
      return next();
    }
    return res.sendStatus(401);
  }

  if (err) {
    console.log("err", err);
    return res.sendStatus(403);
  }

  const userData = Decode as {
    username: string;
    user_id: number;
    role: UserRoles;
  };

  req.auth_data = {
    jwt: accessToken,
    username: userData?.username,
    user_id: userData?.user_id,
    role: userData.role,
  };

  return next();
};

export const validateRolePermission: (
  // eslint-disable-next-line no-unused-vars
  permissionsArr: Permissions
) => RequestHandler = (permissions) => (req, res, next) => {
  // eslint-disable-next-line eqeqeq
  const permissionsUserID = req?.auth_data?.user_id == req.query?.userID;

  // Check if the client can get the data by permission type or
  // or by signUp role with a corresponded role (for sign up a new trainee's user ).
  const checkPermissionByRoleType = (el: string) =>
    el === req?.auth_data?.role ||
    el === "userID" ||
    req?.signUp_data?.role === el;

  const checkRoleCallBack = (el: string) =>
    el === req?.auth_data?.role || el === "userID";
  const checkUserIDRoleCallBack = (el: string) => el === "userID";
  const checkPermissionByRoleUserID = permissions.type.some(
    checkUserIDRoleCallBack
  );

  // The results (true or false) of the some callback on the permissions operations array of roles.
  const checkPermissionByRolesType = permissions.type.some(
    checkPermissionByRoleType
  );
  const checkPermissionByRolesCreateOperation =
    permissions.operations?.create.some(checkRoleCallBack);
  const checkPermissionByRolesUpdateOperation =
    permissions.operations?.update.some(checkRoleCallBack);
  const checkPermissionByRolesDeleteOperation =
    permissions.operations?.delete.some(checkRoleCallBack);

  // Check if the request should pass to the next middleware.
  if (checkPermissionByRolesType) {
    if (checkPermissionByRoleUserID && !permissionsUserID)
      return res.sendStatus(401);
    if (req.method === "GET") return next();
    if (req.method === "POST") {
      if (checkPermissionByRolesCreateOperation) return next();
    } else if (req.method === "PUT") {
      if (checkPermissionByRolesUpdateOperation) return next();
    } else if (req.method === "DELETE") {
      if (checkPermissionByRolesDeleteOperation) return next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(401);

  return res.sendStatus(401);
};
