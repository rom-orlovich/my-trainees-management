import { createBrowserRouter, RouteObject } from "react-router-dom";
import Dashboard from "../Dashboard";
import ChangePasswordPage from "../pages/AuthPages/ChangePasswordPage/ChangePasswordPage";
import LoginPage from "../pages/AuthPages/LoginPage/LoginPage";
import SignUpPage from "../pages/AuthPages/SignUpPage/SignUpPage";
import SignUpPageNewTrainee from "../pages/AuthPages/SignUpPage/SignUpPageNewTrainee";
import { APP_ROUTE } from "./appRoutesConstants";
import EmailVerifyPage from "../pages/AuthPages/EmailVerifyPage/EmailVerifyPage";

import { adminOrTrainerProtectedRoutes } from "./protectedRoutes/adminOrTrainerProtectedRoutes";
import { sharedProtectedRoutes } from "./protectedRoutes/sharedProtectedRoutes";
import MainPageRouteByRole from "./utilities/MainPageRouteByRole";

import { PersistedLogin } from "./utilities/PersistedLogin";
import { adminProtectedRoutes } from "./protectedRoutes/adminProtectedRoutes";
import { traineeProtectedRoutes } from "./protectedRoutes/traineeProtectedRoutes";

import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const mainPageRouteByRole = {
  path: "",
  element: <MainPageRouteByRole />,
};

export const authRoutes: RouteObject[] = [
  { path: APP_ROUTE.LOGIN_ROUTE, element: <LoginPage /> },
  { path: APP_ROUTE.SIGN_UP, element: <SignUpPage /> },
  { path: APP_ROUTE.CHANGE_USER_CRED_ROUTE, element: <ChangePasswordPage /> },
  { path: APP_ROUTE.EMAIL_VERIFY_ROUTE, element: <EmailVerifyPage /> },
  { path: APP_ROUTE.SIGN_UP_TRAINEE, element: <SignUpPageNewTrainee /> },
];

export const dashboardRoutes: RouteObject = {
  path: APP_ROUTE.HOME_PAGE,
  element: <Dashboard />,
  children: [
    mainPageRouteByRole,
    sharedProtectedRoutes,
    adminOrTrainerProtectedRoutes,
    adminProtectedRoutes,
    traineeProtectedRoutes,
  ],
};
export const appRoutes: RouteObject[] = [
  {
    path: APP_ROUTE.HOME_PAGE,
    element: <PersistedLogin />,
    children: [...authRoutes, dashboardRoutes],

    errorElement: <ErrorPage />,
  },
];

export const browserRoutes = createBrowserRouter(appRoutes);
