import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ allowedRole }: { allowedRole: boolean }) {
  const location = useLocation();
  console.log(allowedRole);
  return allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to={""} state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
