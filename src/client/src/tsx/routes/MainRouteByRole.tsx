import React from "react";
import useCheckRole from "../hooks/useCheckRole";
import MyWorkoutsPage from "../pages/MyWorkoutsPage/MyWorkoutsPage";
import TraineesPage from "../pages/TraineesPage/TraineesPage";
import UsersPage from "../pages/UsersPage/UsersPage";

function MainRouteByRole() {
  const { isAdmin, isTrainer } = useCheckRole();

  if (isAdmin) return <UsersPage />;
  if (isTrainer) return <TraineesPage />;

  return <MyWorkoutsPage />;
}

export default MainRouteByRole;
