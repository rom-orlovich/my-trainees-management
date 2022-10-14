import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";
import { getAuthState } from "../redux/slices/authSlice";
import { APP_ROUTE } from "./appRoutesConstants";

function ProtectedRoute() {
  const authState = useAppSelector(getAuthState);
  const location = useLocation();

  return authState.user ? (
    <Outlet />
  ) : (
    <Navigate to={APP_ROUTE.LOGIN_ROUTE} state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
