import React from "react";
import { Route, Routes } from "react-router-dom";
import ChangePasswordPage from "../pages/AuthPages/ChangePasswordPage/ChangePasswordPage";
import LoginPage from "../pages/AuthPages/LoginPage/LoginPage";
import SignUpPage from "../pages/AuthPages/SignUpPage/SignUpPage";
import SignUpPageNewTrainee from "../pages/AuthPages/SignUpPage/SignUpPageNewTrainee";
import EmailVerifyPage from "../pages/AuthPages/EmailVerifyPage/EmailVerifyPage";
import { APP_ROUTE } from "./appRoutesConstants";

const AuthRoutes = () => (
  <Routes>
    <Route path={APP_ROUTE.LOGIN_ROUTE} element={<LoginPage />} />
    <Route path={APP_ROUTE.SIGN_UP} element={<SignUpPage />} />
    <Route
      path={APP_ROUTE.CHANGE_USER_CRED_ROUTE}
      element={<ChangePasswordPage />}
    />
    <Route path={APP_ROUTE.EMAIL_VERIFY_ROUTE} element={<EmailVerifyPage />} />
    <Route
      path={APP_ROUTE.SIGN_UP_TRAINEE}
      element={<SignUpPageNewTrainee />}
    />
  </Routes>
);

export default AuthRoutes;
