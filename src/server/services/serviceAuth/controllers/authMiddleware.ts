import { RequestHandler } from "webpack-dev-server";
// eslint-disable-next-line no-unused-vars
import { selectQuery, updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";
import { Permissions } from "../../usersPermission";

import { UserRoles, verifyAsync } from "../utilities/authHelpers";

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
const checkUsersHaveToken = async (token: string, email: number) => {
  // eslint-disable-next-line no-unused-vars
  const [user, errorUser] = await promiseHandler(
    selectQuery(
      TABLES_DATA.USERS_TABLE_NAME,
      "*",
      `where verify_token=$1 and email=$2`,
      [token, email]
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

  if (Decode?.profile_id) {
    if (await checkTraineeHaveToken(accessToken, Decode?.profile_id)) {
      req.signUp_data = {
        role: "trainer",
      };
      return next();
    }
    return res.sendStatus(401);
  }

  if (Decode?.email) {
    if (await checkUsersHaveToken(accessToken, Decode?.email)) {
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
  const checkRoleCallBack = (el: string) => el === req?.auth_data?.role;

  if (
    permissions.type.some(
      (el) => el === req?.auth_data?.role || req?.signUp_data?.role === el
    )
  ) {
    if (req.method === "GET") return next();
    if (req.method === "POST") {
      if (permissions.operations?.create.some(checkRoleCallBack)) return next();
    } else if (req.method === "PUT") {
      if (permissions.operations?.update.some(checkRoleCallBack)) return next();
    } else if (req.method === "DELETE") {
      if (permissions.operations?.delete.some(checkRoleCallBack)) return next();
    } else return res.sendStatus(401);
  } else return res.sendStatus(401);

  return res.sendStatus(401);
};
