import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { UserRoles } from "../../Dashboard";
import useCheckRole from "../../hooks/useCheckRole";
import { User } from "../../redux/api/interfaceAPI";

function ProtectedRoute({ allowedRole }: { allowedRole: boolean }) {
  const location = useLocation();

  return allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
}

export const SharedProtectedRoutes = () => {
  const { isAdmin, isTrainer, isTrainee } = useCheckRole();
  return <ProtectedRoute allowedRole={isAdmin || isTrainer || isTrainee} />;
};
export const AdminOrTrainerProtectedRoutes = () => {
  const { isAdmin, isTrainer } = useCheckRole();
  return <ProtectedRoute allowedRole={isAdmin || isTrainer} />;
};
export const AdminProtectedRoutes = () => {
  const { isAdmin } = useCheckRole();
  return <ProtectedRoute allowedRole={isAdmin} />;
};
export const TraineeProtectedRoutes = () => {
  const { isTrainee } = useCheckRole();
  return <ProtectedRoute allowedRole={isTrainee} />;
};

export default ProtectedRoute;
