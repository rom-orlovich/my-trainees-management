import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";
import { getAuthState } from "../redux/slices/authSlice";
import { APP_ROUTE } from "./routesConstants";

function ProtectedRoute() {
  const authState = useAppSelector(getAuthState);
  const location = useLocation();

  return !!authState.user ? (
    <Outlet />
  ) : (
    <Navigate to={APP_ROUTE.LOGIN_ROUTE} state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
