/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
// eslint-disable-next-line no-unused-vars
import { selectQuery, updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";
import {
  Permission,
  Permissions,
  PermissionsRolesType,
} from "../../usersPermission";

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

  if (!accessToken) {
    return res.sendStatus(401);
  }
  const [decode, err] = await promiseHandler(
    verifyAsync(accessToken, process.env.ACCESS_TOKEN_SECRET)
  );
  const Decode = decode as Record<string, any>;

  // Check if the request purpose is for signUp new trainee user,
  // grant him a 'trainer' privilege to get his data in signUp process,
  // and check if the user have the corresponded verify signUp token.
  // The next middleware is validateRolePermission.
  if (Decode?.profile_id && Decode.tokenType === TokenType.VERIFY_SIGN_UP) {
    if (await checkTraineeHaveToken(accessToken, Decode?.profile_id)) {
      req.signUpData = {
        role: "trainer",
      };
      return next();
    }
    return res.sendStatus(401);
  }
  // Check if the request purpose is for change user's credentials
  // and check if the user have the corresponded verify email token.
  // The next middleware is validateMiddlewareHandlerChangeUserCredSchema
  if (Decode?.user_id && Decode.tokenType === TokenType.VERIFY_CHANGE_CRED) {
    if (await checkUsersHaveToken(accessToken, Decode?.user_id)) return next();
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
    trainer_user_id?: number;
  };

  req.auth_data = {
    jwt: accessToken,
    trainer_user_id: userData.trainer_user_id,
    username: userData?.username,
    user_id: userData?.user_id,
    role: userData.role,
  };
  // For CRUD resources request the next middleware is validateRolePermission
  return next();
};

export const validateRolePermission: (
  // eslint-disable-next-line no-unused-vars
  permissionsArr: Permissions
) => RequestHandler = (permissions) => (req, res, next) => {
  // auth_data is the access token's decoded information which check in the validateTokenMiddleware.
  // *Trainer provide trainerUserID in order to access the data of his trainees.
  const checkPermissionsUserID =
    Number(req?.auth_data?.user_id) === Number(req.query?.userID) ||
    Number(req?.auth_data?.user_id) === Number(req.query?.trainerUserID);

  // Check if there is a permission base on userID and if it does so check if the userID from the access token
  // is match to the query's userID.
  // If there isn't a permission base on userID check only if the roles are match.
  const checkRoleCallBack = (el: Permission) => {
    if (el.by === "userID") {
      return checkPermissionsUserID && el.role === req?.auth_data?.role;
    }
    if (el.role === req?.auth_data?.role) return true;
    return false;
  };

  // Check if the client can get the data by permission
  // or by signUp role with a corresponded role (for sign up a new trainee's user).
  const checkPermissionByRoleWithSignUp = (el: Permission) =>
    checkRoleCallBack(el) || req?.signUpData?.role === el.role;

  // The results (true or false) of the some callback on the permissions operations array of roles.
  const checkPermissionByRolesReadOperation = permissions?.read.some(
    checkPermissionByRoleWithSignUp
  );
  const checkPermissionByRolesCreateOperation =
    permissions?.create.some(checkRoleCallBack);
  const checkPermissionByRolesUpdateOperation =
    permissions?.update.some(checkRoleCallBack);
  const checkPermissionByRolesDeleteOperation =
    permissions?.delete.some(checkRoleCallBack);

  // Check if the request should pass to the createCRUDroutes middleware.
  if (req.method === "GET") {
    if (checkPermissionByRolesReadOperation) return next();
  } else if (req.method === "POST") {
    if (checkPermissionByRolesCreateOperation) return next();
  } else if (req.method === "PUT") {
    if (checkPermissionByRolesUpdateOperation) return next();
  } else if (req.method === "DELETE") {
    if (checkPermissionByRolesDeleteOperation) return next();
  } else return res.sendStatus(401);

  return res.sendStatus(401);
};
