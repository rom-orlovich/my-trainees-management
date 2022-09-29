import { Router } from "express";
import { API_ROUTES } from "../../apiRoutesConstants";
import { credSchema } from "../../schemas/DBSchemas";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";
import {
  loginHandler,
  registerHandler,
  resetUserDetailsNameHandler,
} from "../controllers/handleAuth";

const authRouter = Router();
const validateMiddlewareHandler = validateMiddleware(credSchema);
authRouter.post(
  API_ROUTES.REGISTER_ROUTE,
  validateMiddlewareHandler,
  registerHandler
);
authRouter.put(
  API_ROUTES.CHANGE_USER_CRED_ROUTE,
  validateMiddlewareHandler,
  resetUserDetailsNameHandler
);
authRouter.post(
  API_ROUTES.LOGIN_ROUTE,
  validateMiddlewareHandler,
  loginHandler
);

export default authRouter;
