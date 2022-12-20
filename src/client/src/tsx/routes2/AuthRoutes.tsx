import { RouteObject } from "react-router-dom";
import ChangePasswordPage from "../pages/AuthPages/ChangePasswordPage/ChangePasswordPage";
import LoginPage from "../pages/AuthPages/LoginPage/LoginPage";
import SignUpPage from "../pages/AuthPages/SignUpPage/SignUpPage";
import { APP_ROUTE } from "../routes/appRoutesConstants";
import EmailVerifyPage from "../pages/AuthPages/EmailVerifyPage/EmailVerifyPage";
import SignUpPageNewTrainee from "../pages/AuthPages/SignUpPage/SignUpPageNewTrainee";

export const AuthRoutes: RouteObject[] = [
  { path: APP_ROUTE.LOGIN_ROUTE, element: <LoginPage /> },
  { path: APP_ROUTE.SIGN_UP, element: <SignUpPage /> },
  { path: APP_ROUTE.CHANGE_USER_CRED_ROUTE, element: <ChangePasswordPage /> },
  { path: APP_ROUTE.EMAIL_VERIFY_ROUTE, element: <EmailVerifyPage /> },
  { path: APP_ROUTE.SIGN_UP_TRAINEE, element: <SignUpPageNewTrainee /> },
];
