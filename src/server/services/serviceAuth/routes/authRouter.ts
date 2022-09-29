import { Router } from "express";
import { API_ROUTES } from "../../apiRoutesConstants";
import { authSchema } from "../../schemas/DBSchemas";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";
import {
  loginHandler,
  registerHandler,
  resetUserDetailsNameHandler,
} from "../controllers/handleAuth";

const authRouter = Router();
const validateMiddlewareHandler = validateMiddleware(authSchema);
authRouter.post(
  API_ROUTES.REGISTER_ROUTE,
  validateMiddlewareHandler,
  registerHandler
);
authRouter.put(
  `${API_ROUTES.USERS_ROUTE}/:id/resetDetails`,
  validateMiddlewareHandler,
  resetUserDetailsNameHandler
);
authRouter.post(
  API_ROUTES.LOGIN_ROUTE,
  validateMiddlewareHandler,
  loginHandler
);

export default authRouter;
