import { Router } from "express";
import { API_ROUTES } from "../../apiRoutesConstants";
import {
  changePasswordSchema,
  emailVerifySchema,
  loginSchema,
  signUpSchema,
} from "../../schemas/DBSchemas";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";
import { validateTokenMiddleware } from "../controllers/authMiddleware";

import { changeUserCredentialsHandler } from "../controllers/handleChangeCredentials";
import { handleEmailVerify } from "../controllers/handleEmailVerify";
import { loginHandler } from "../controllers/handleLogin";
import { logoutHandler } from "../controllers/handleLogout";
import { refreshTokenHandler } from "../controllers/handleRefreshToken";
import { signUpHandlerTrainee } from "../controllers/handleSignUpTrainee";

import { signUpHandlerTrainer } from "../controllers/handleSignUpTrainer";

const authRouter = Router();
const validateMiddlewareHandlerLogin = validateMiddleware(loginSchema);
const validateMiddlewareHandlerSignUp = validateMiddleware(signUpSchema);
const validateMiddlewareHandlerEmailVerify =
  validateMiddleware(emailVerifySchema);

const validateMiddlewareHandlerChangePassword =
  validateMiddleware(changePasswordSchema);

authRouter.post(
  `${API_ROUTES.SIGN_UP_ROUTE}/trainer`,
  validateMiddlewareHandlerSignUp,

  signUpHandlerTrainer
);

authRouter.post(
  API_ROUTES.LOGIN_ROUTE,
  validateMiddlewareHandlerLogin,
  loginHandler
);

authRouter.get(API_ROUTES.REFRESH_TOKEN_ROUTE, refreshTokenHandler);

authRouter.post(
  `${API_ROUTES.SIGN_UP_ROUTE}/trainee/:profileID`,
  // validateTokenMiddleware,
  validateMiddlewareHandlerSignUp,
  signUpHandlerTrainee
);

authRouter.post(
  API_ROUTES.EMAIL_VERIFY_ROUTE,
  validateMiddlewareHandlerEmailVerify,
  handleEmailVerify
);

authRouter.put(
  API_ROUTES.CHANGE_USER_CRED_ROUTE,
  validateTokenMiddleware,
  validateMiddlewareHandlerChangePassword,

  changeUserCredentialsHandler
);

authRouter.get(API_ROUTES.LOGOUT_ROUTE, logoutHandler);

export default authRouter;
