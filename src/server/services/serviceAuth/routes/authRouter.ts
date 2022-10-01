import { Router } from "express";
import { API_ROUTES } from "../../apiRoutesConstants";
import { credSchema } from "../../schemas/DBSchemas";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";
import {
  loginHandler,
  changeUserCredentialsHandler,
  refreshTokenHandler,
  logoutHandler,
  sigUpHandler,
} from "../controllers/handleAuth";
import { validateTokenMiddleware } from "../JWT";

const authRouter = Router();
const validateMiddlewareHandler = validateMiddleware(credSchema);
authRouter.get(API_ROUTES.REFRESH_TOKEN_ROUTE, refreshTokenHandler);
authRouter.get(API_ROUTES.LOGOUT_ROUTE, logoutHandler);
authRouter.post(
  API_ROUTES.SIGN_UP_ROUTE,
  validateMiddlewareHandler,
  sigUpHandler
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
