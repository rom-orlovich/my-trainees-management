import { RequestHandler } from "webpack-dev-server";
import { selectQuery, updateQuerySingleItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { promiseHandler } from "../../../utilities/helpers";
import { Permissions } from "../../usersPermission";

import { UserRoles, verifyAsync } from "../utilities/authHelpers";

const checkTraineeHaveToken = async (token: string) => {
  // const [trainee] = await promiseHandler(
  //   updateQuerySingleItem(
  //     TABLES_DATA.TRAINEES_TABLE_NAME,
  //     { sign_up_token: "" },
  //     token,
  //     `where sign_up_token=$1`
  //   )
  // );
  // eslint-disable-next-line no-unused-vars
  const [trainee, errorTrainee] = await promiseHandler(
    selectQuery(
      TABLES_DATA.TRAINEES_TABLE_NAME,
      "*",
      "where sign_up_token=$1",
      [token]
    )
  );
  console.log(trainee ? trainee[0] : "");
  return trainee && trainee[0];
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
  console.log(Decode);

  if (Decode?.profile_id) {
    if (await checkTraineeHaveToken(accessToken)) {
      console.log("tre");
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
  const checkRoleCallBack = (el: string) => el === req.auth_data.role;
  if (permissions.type.some((el) => el === req.auth_data.role)) {
    if (req.method === "GET") return next();
    if (req.method === "POST") {
      if (permissions.operations?.create.some(checkRoleCallBack)) return next();
    } else if (req.method === "PUT") {
      if (permissions.operations?.update.some(checkRoleCallBack)) return next();
    } else if (req.method === "DELETE") {
      if (permissions.operations?.delete.some(checkRoleCallBack)) return next();
    } else return res.sendStatus(401);
  }

  return res.sendStatus(401);
};

export const createUserRoleMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const endPoint = req.path.split("/")[2];

  if (endPoint === "newTrainer") {
    req.signUp_data = {
      role: "trainer",
    };
  } else if (endPoint === "newTrainee") {
    req.signUp_data = {
      role: "trainee",
    };
  } else {
    req.signUp_data = {
      role: "admin",
    };
  }

  next();
};
