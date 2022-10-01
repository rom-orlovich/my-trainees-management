import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authApi } from "../redux/api/authAPI";
import { useAppSelector } from "../redux/hooks";
import { APP_ROUTE } from "./routesConstants";

function ProtectedRoute() {
  const token = useAppSelector((state) => state.authSlice.accessToken);
  const [refreshToken, state] = authApi.useLazyRefreshTokenQuery();
  const location = useLocation();

  // useEffect(() => {
  //   if (!token) {
  //     refreshToken({});
  //   }
  // }, []);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={APP_ROUTE.LOGIN_ROUTE} state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
