import { RequestHandler } from "webpack-dev-server";
import { promiseHandler } from "../../../utilities/helpers";

import { UserRoles, verifyAsync } from "../utilities/authHelpers";

export const validateTokenMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const accessToken = req.headers.authorization?.split("Bearer ")[1];

  if (!accessToken) return res.sendStatus(401);

  const [decode, err] = await promiseHandler(
    verifyAsync(accessToken, process.env.ACCESS_TOKEN_SECRET)
  );

  if (err) {
    console.log(err);
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
