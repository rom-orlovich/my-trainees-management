import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";
import { APP_ROUTE } from "./routesConstants";

function ProtectedRoute() {
  const token = useAppSelector((state) => state.authSlice.accessToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={APP_ROUTE.LOGIN_ROUTE} state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
