import { Router } from "express";
import { API_ROUTES } from "../../apiRoutesConstants";
import { credSchema } from "../../schemas/DBSchemas";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";
import {
  loginHandler,
  registerHandler,
  changeUserCredentialsHandler,
  refreshTokenHandler,
} from "../controllers/handleAuth";

const authRouter = Router();
const validateMiddlewareHandler = validateMiddleware(credSchema);
authRouter.get(API_ROUTES.REFRESH_TOKEN_ROUTE, refreshTokenHandler);
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
  changeUserCredentialsHandler
);

export default authRouter;
