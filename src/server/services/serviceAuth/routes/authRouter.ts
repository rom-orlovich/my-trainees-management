import { Router } from "express";
import { API_ROUTES } from "../../apiRoutesConstants";
import { loginSchema } from "../../schemas/DBSchemas";
import { validateMiddleware } from "../../serviceValidate/validateMiddleware";
import {
  loginHandler,
  changeUserCredentialsHandler,
  refreshTokenHandler,
  logoutHandler,
  signUpHandler,
  createUserRoleMiddleware,
} from "../controllers/handleAuth";
import { validateTokenMiddleware } from "../JWT";

const routesRole = ["newTrainer", "newTrainee", "admin"];
const authRouter = Router();
const validateMiddlewareHandler = validateMiddleware(loginSchema);
authRouter.get(
  API_ROUTES.REFRESH_TOKEN_ROUTE,
  validateTokenMiddleware,
  refreshTokenHandler
);
authRouter.get(API_ROUTES.LOGOUT_ROUTE, validateTokenMiddleware, logoutHandler);

routesRole.forEach((route) => {
  authRouter.post(
    `${API_ROUTES.SIGN_UP_ROUTE}/${route}`,
    validateMiddlewareHandler,
    createUserRoleMiddleware,
    signUpHandler
  );
});

authRouter.post(
  API_ROUTES.LOGIN_ROUTE,
  validateMiddlewareHandler,
  loginHandler
);
authRouter.put(
  API_ROUTES.CHANGE_USER_CRED_ROUTE,
  validateTokenMiddleware,
  validateMiddlewareHandler,

  changeUserCredentialsHandler
);

export default authRouter;
