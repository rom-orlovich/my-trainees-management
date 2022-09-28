import { RequestHandler } from "webpack-dev-server";
import { insertQueryOneItem, selectQuery } from "../PGSql/sqlHelpers";
import { promiseHandler } from "../utilities/helpers";
import { ErrorCustomizes } from "./handleErrors";

export const register: RequestHandler = async (req, res, next) => {
  const { password, username } = req.body;

  const queryLogic = "where username = $1";
  const [user, error] = await promiseHandler(
    insertQueryOneItem("users", req.body)
  );

  if (error) next(error);
};
