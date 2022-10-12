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
import { signUpHandlerTrainee } from "../controllers/handleSignUpTrainee";

import { signUpHandlerTrainer } from "../controllers/handleSignUpTrainer";

const authRouter = Router();
const validateMiddlewareHandlerLogin = validateMiddleware(loginSchema);
const validateMiddlewareHandlerSignUp = validateMiddleware(signUpSchema);
const validateMiddlewareHandlerChangePassword =
  validateMiddleware(changePasswordSchema);

authRouter.get(API_ROUTES.REFRESH_TOKEN_ROUTE, refreshTokenHandler);
authRouter.get(API_ROUTES.LOGOUT_ROUTE, logoutHandler);

authRouter.post(
  `${API_ROUTES.SIGN_UP_ROUTE}/newTrainer`,
  validateMiddlewareHandlerSignUp,
  createUserRoleMiddleware,
  signUpHandlerTrainer
);
authRouter.post(
  `${API_ROUTES.SIGN_UP_ROUTE}/newTrainee/:id`,
  validateTokenMiddleware,
  validateMiddlewareHandlerSignUp,
  // createUserRoleMiddleware,
  signUpHandlerTrainee
);

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
