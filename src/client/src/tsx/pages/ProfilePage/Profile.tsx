import React from "react";
import { Navigate } from "react-router-dom";
import useCheckRole from "../../hooks/useCheckRole";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import TraineeProfile from "./TraineeProfile/TraineeProfile";
import TrainerProfile from "./TrainerProfile/TrainerProfile";

function ProfilePage() {
  const { isTrainee, isTrainer } = useCheckRole();
  if (isTrainee) return <TraineeProfile />;
  if (isTrainer) return <TrainerProfile />;
  return <Navigate to={`/${APP_ROUTE.COMING_SOON}`}></Navigate>;
}

export default ProfilePage;
