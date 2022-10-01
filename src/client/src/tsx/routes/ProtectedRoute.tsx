import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { setLogout } from "../redux/slices/authSlice";
import { APP_ROUTE } from "./routesConstants";

function ProtectedRoute() {
  const token = useAppSelector((state) => state.authSlice.accessToken);
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(token);
  // useEffect(() => {
  //   if (location.pathname === APP_ROUTE.LOGOUT_ROUTE) {
  //     dispatch(setLogout());
  //   }
  // }, [location.pathname]);
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={APP_ROUTE.LOGIN_ROUTE} state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
