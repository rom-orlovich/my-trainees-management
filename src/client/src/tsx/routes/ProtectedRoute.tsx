import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";
import { getAuthState } from "../redux/slices/authSlice";
import { APP_ROUTE } from "./appRoutesConstants";

function ProtectedRoute({ allowedRole }: { allowedRole: boolean }) {
  const authState = useAppSelector(getAuthState);
  const location = useLocation();

  return allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to={""} state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
