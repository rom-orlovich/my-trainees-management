import { RequestHandler } from "webpack-dev-server";
import { hash } from "bcrypt";
import { insertQueryOneItem } from "../PGSql/sqlHelpers";
import { promiseHandler } from "../utilities/helpers";

import { createModifiedActionResult } from "./controllerCRUD";
import { API_ROUTES } from "../routes/apiRoutesConstants";

const createModifiedActionResultFun = createModifiedActionResult(
  API_ROUTES.USER_ENTITY,
  true
);
export const registerHandler: RequestHandler = async (req, res, next) => {
  const { password } = req.body;
  const hashPassword = await hash(password, 10);
  const [user, error] = await promiseHandler(
    insertQueryOneItem("users", { ...req.body, password: hashPassword })
  );
  req.modifiedActionResult = createModifiedActionResultFun(
    user,
    error,
    "create",
    201
  );

  return next();
};
