import { Router } from "express";
import {
  loginHandler,
  registerHandler,
  resetUserDetailsNameHandler,
} from "../controllers/handleAuth";
import { API_ROUTES } from "./apiRoutesConstants";

const authRouter = Router();

authRouter.post(API_ROUTES.REGISTER_ROUTE, registerHandler);
authRouter.put(
  `${API_ROUTES.USERS_ROUTE}/:id/resetDetails`,
  resetUserDetailsNameHandler
);
authRouter.post(API_ROUTES.LOGIN_ROUTE, loginHandler);

export default authRouter;
