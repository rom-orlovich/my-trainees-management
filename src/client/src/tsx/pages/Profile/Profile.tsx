import React from "react";
import useCheckRole from "../../hooks/useCheckRole";
import TraineeProfile from "./TraineeProfile/TraineeProfile";

function Profile() {
  const { isTrainee } = useCheckRole();
  if (isTrainee) return <TraineeProfile />;
  return <>profile</>;
}

export default Profile;
