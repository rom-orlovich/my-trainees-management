import React from "react";
import { Navigate } from "react-router-dom";
import useCheckRole from "../../hooks/useCheckRole";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import TraineeProfile from "./TraineeProfile/TraineeProfile";

function ProfilePage() {
  const { isTrainee } = useCheckRole();
  if (isTrainee) return <TraineeProfile />;
  return <Navigate to={`/${APP_ROUTE.COMING_SOON}`}></Navigate>;
}

export default ProfilePage;
