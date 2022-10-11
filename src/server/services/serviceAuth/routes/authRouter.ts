import { Router } from "express";
import { API_ROUTES } from "../../apiRoutesConstants";
import {
  changePasswordSchema,
  loginSchema,
  signUpSchema,
} from "../../schemas/DBSchemas";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";
import {
  createUserRoleMiddleware,
  validateTokenMiddleware,
} from "../controllers/authMiddleware";

import { changeUserCredentialsHandler } from "../controllers/handleChangeCredentials";
import { loginHandler } from "../controllers/handleLogin";
import { logoutHandler } from "../controllers/handleLogout";
import { refreshTokenHandler } from "../controllers/handleRefreshToken";
import { signUpHandler } from "../controllers/handleSignUp";

const routesRole = ["newTrainer", "newTrainee", "admin"];
const authRouter = Router();
const validateMiddlewareHandlerLogin = validateMiddleware(loginSchema);
const validateMiddlewareHandlerSignUp = validateMiddleware(signUpSchema);
const validateMiddlewareHandlerChangePassword =
  validateMiddleware(changePasswordSchema);

authRouter.get(API_ROUTES.REFRESH_TOKEN_ROUTE, refreshTokenHandler);
authRouter.get(API_ROUTES.LOGOUT_ROUTE, logoutHandler);

routesRole.forEach((route) => {
  authRouter.post(
    `${API_ROUTES.SIGN_UP_ROUTE}/${route}`,
    validateMiddlewareHandlerSignUp,
    createUserRoleMiddleware,
    signUpHandler
  );
});

authRouter.post(
  API_ROUTES.LOGIN_ROUTE,
  validateMiddlewareHandlerLogin,
  loginHandler
);
authRouter.put(
  API_ROUTES.CHANGE_USER_CRED_ROUTE,
  validateTokenMiddleware,
  validateMiddlewareHandlerChangePassword,

  changeUserCredentialsHandler
);

export default authRouter;
