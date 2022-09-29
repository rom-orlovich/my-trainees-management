import { Router } from "express";
import { API_ROUTES } from "../../apiRoutesConstants";
import {
  loginHandler,
  registerHandler,
  resetUserDetailsNameHandler,
} from "../controllers/handleAuth";

const authRouter = Router();

authRouter.post(API_ROUTES.REGISTER_ROUTE, registerHandler);
authRouter.put(
  `${API_ROUTES.USERS_ROUTE}/:id/resetDetails`,
  resetUserDetailsNameHandler
);
authRouter.post(API_ROUTES.LOGIN_ROUTE, loginHandler);

export default authRouter;
