import { RequestHandler } from "webpack-dev-server";
import { promiseHandler } from "../../../utilities/helpers";
import { Permissions } from "../../usersPermission";

import { UserRoles, verifyAsync } from "../utilities/authHelpers";

export const validateTokenMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  // console.log("handle token middleware");
  const accessToken = req.headers.authorization?.split("Bearer ")[1];

  if (!accessToken) {
    return res.sendStatus(401);
  }

  const [decode, err] = await promiseHandler(
    verifyAsync(accessToken, process.env.ACCESS_TOKEN_SECRET)
  );

  if (err) {
    console.log("err", err);
    return res.sendStatus(403);
  }

  const userData = decode as {
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
  console.log("permissions", permissions);
  console.log("role", req.auth_data.role);
  const checkRoleCallBack = (el: string) => el === req.auth_data.role;
  console.log(req.method);
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
  } else if (endPoint === "trainee") {
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
