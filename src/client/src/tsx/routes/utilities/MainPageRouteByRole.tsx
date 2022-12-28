/* eslint-disable no-nested-ternary */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useCheckRole from "../../hooks/useCheckRole";
import { APP_ROUTE } from "../appRoutesConstants";

function MainPageRouteByRole() {
  const { isAdmin, isTrainer, isTrainee } = useCheckRole();
  const location = useLocation();
  const mainRoutePath = isAdmin
    ? APP_ROUTE.USERS_ROUTE
    : isTrainer
    ? APP_ROUTE.TRAINEES_ROUTE
    : isTrainee
    ? APP_ROUTE.MY_WORKOUTS_ROUTE
    : APP_ROUTE.HOME_PAGE;
  return <Navigate to={mainRoutePath} replace state={{ state: location }} />;
}

export default MainPageRouteByRole;
