import React from "react";
import useCheckRole from "../../hooks/useCheckRole";
import HomePage from "../../pages/HomePage/HomePage";
import MyWorkoutsPage from "../../pages/MyWorkoutsPage/MyWorkoutsPage";
import TraineesPage from "../../pages/TraineesPage/TraineesPage";
import UsersPage from "../../pages/UsersPage/UsersPage";

function MainRouteByRole() {
  const { isAdmin, isTrainer, isTrainee } = useCheckRole();

  if (isAdmin) return <UsersPage />;
  if (isTrainer) return <TraineesPage />;
  if (isTrainee) return <MyWorkoutsPage />;
  return <></>;
  // return <HomePage />;
}

export default MainRouteByRole;
