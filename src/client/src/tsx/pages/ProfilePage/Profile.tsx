import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useCheckRole from "../../hooks/useCheckRole";
import useGetUserTraineeData from "../../hooks/useGetUserTraineeData";

import { APP_ROUTE } from "../../routes2/appRoutesConstants";
import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import TraineeProfile from "./TraineeProfile/TraineeProfile";
import TrainerProfile from "./TrainerProfile/TrainerProfile";

function Profile() {
  const { isTrainee, isTrainer } = useCheckRole();
  const { profileID } = useGetUserTraineeData();
  if (isTrainee || profileID) return <TraineeProfile />;
  if (isTrainer) return <TrainerProfile />;
  return <Navigate to={`/`} />;
}

function ProfilePage() {
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.PROFILE_ROUTE}>
      <Profile />
    </InsteadOutletRoutes>
  );
}
export default ProfilePage;
