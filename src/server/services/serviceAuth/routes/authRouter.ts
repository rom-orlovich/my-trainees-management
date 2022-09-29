import { Router } from "express";
import { API_ROUTES } from "../../apiRoutesConstants";
import { credSchema } from "../../schemas/DBSchemas";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";
import {
  loginHandler,
  registerHandler,
  changeUserCredentialsHandler,
  refreshTokenHandler,
  logoutHandler,
} from "../controllers/handleAuth";
import { validateTokenMiddleware } from "../JWT";

const authRouter = Router();
const validateMiddlewareHandler = validateMiddleware(credSchema);
authRouter.get(API_ROUTES.REFRESH_TOKEN_ROUTE, refreshTokenHandler);
authRouter.get(API_ROUTES.LOGOUT_ROUTE, validateTokenMiddleware, logoutHandler);
authRouter.post(
  API_ROUTES.REGISTER_ROUTE,
  validateMiddlewareHandler,
  registerHandler
);
authRouter.post(
  API_ROUTES.LOGIN_ROUTE,
  validateMiddlewareHandler,
  loginHandler
);
authRouter.put(
  API_ROUTES.CHANGE_USER_CRED_ROUTE,
  validateMiddlewareHandler,
  validateTokenMiddleware,
  changeUserCredentialsHandler
);

export default authRouter;
