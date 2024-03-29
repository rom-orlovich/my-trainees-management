import { RouteObject } from "react-router-dom";
import ParticipantsGroupPage from "../../pages/ParticipantsGroupPage/ParticipantsGroupPage";
import SchedulePage from "../../pages/SchedulePage/SchedulePage";

import MiscDataPage from "../../pages/MiscDataPage/MiscDataPage";

import { APP_ROUTE } from "../appRoutesConstants";

import { SharedProtectedRoutes } from "../components/ProtectedRoute";
import { nutritionMenusListRoutes } from "./sharedProtectedRoutes/nutritionProgramListRoutes";
import { profileRoutes } from "./sharedProtectedRoutes/profileRoutes";
import { trainingProgramsListRoutes } from "./sharedProtectedRoutes/trainingProgramListRoutes";

export const settingRoutes: RouteObject = {
  path: APP_ROUTE.MISC_ROUTE,
  element: <MiscDataPage />,
};
export const scheduleRoutes: RouteObject = {
  path: APP_ROUTE.SCHEDULE_ROUTE,
  element: <SchedulePage />,
};
export const participantsGroupListRoutes: RouteObject = {
  path: `${APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}/:id/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}}`,
  element: <ParticipantsGroupPage />,
};

export const sharedProtectedRoutes: RouteObject = {
  path: "",
  element: <SharedProtectedRoutes />,
  children: [
    settingRoutes,
    profileRoutes,
    trainingProgramsListRoutes,
    nutritionMenusListRoutes,
    scheduleRoutes,
    participantsGroupListRoutes,
  ],
};
