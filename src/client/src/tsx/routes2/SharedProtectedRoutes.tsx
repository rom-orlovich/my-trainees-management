import { RouteObject } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage/Profile";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import FinanceStatsPage from "../pages/StatsPages/FinancesStatsPage/FinancesStatsPage";
import LeadsStatsPage from "../pages/StatsPages/LeadsStatsPage/LeadsStatsPage";
import TraineeStatsPage from "../pages/StatsPages/TraineeStatsPage/TraineeStatsPage";
import { APP_ROUTE } from "../routes/appRoutesConstants";
import { AdminOrTrainerProtectedRoutes } from "./utilities/ProtectedRoute";

export const ProfileStatsRoute = [
  {
    path: APP_ROUTE.STATS_ROUTE,
    children: [
      { path: APP_ROUTE.TRAINEES_ROUTE, element: <TraineeStatsPage /> },
      { path: APP_ROUTE.LEADS_ROUTE, element: <LeadsStatsPage /> },
      { path: APP_ROUTE.FINANCES_ROUTE, element: <FinanceStatsPage /> },
    ],
  },
];
export const ProfileRoutes = [
  {
    path: "",
    element: <AdminOrTrainerProtectedRoutes />,
    children: ProfileStatsRoute,
  },
];

export const SharedProtectedRoutesChildren: RouteObject[] = [
  { path: APP_ROUTE.SETTINGS_ROUTE, element: <SettingsPage /> },
  {
    path: APP_ROUTE.PROFILE_ROUTE,
    element: <ProfilePage />,
    children: ProfileRoutes,
  },
];
