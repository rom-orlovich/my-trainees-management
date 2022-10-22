import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";

import { LeadAddForm } from "../components/Forms/LeadForms/LeadAddForm";
import LeadEditForm from "../components/Forms/LeadForms/LeadEditForm";

import TraineeAddForm from "../components/Forms/TraineeForms/TraineeAddForm";

import HomePage from "../pages/HomePage/HomePage";
import LeadsPage from "../pages/LeadsPage/LeadsPage";

import Settings from "../pages/SettingsPage/SettingsPage";

import Trainees from "../pages/TraineesPage/TraineesPage";

import { APP_ROUTE } from "./appRoutesConstants";
import UsersPage from "../pages/UsersPage/UsersPage";

import ComingSoonPage from "../pages/ComingSoonPage/ComingSoonPage";
import MyWorkoutsPage from "../pages/MyWorkoutsPage/MyWorkoutsPage";
import AuthRoutes from "./AuthRoutes";
import PublicRoute from "./utilities/PublicRoute";
import PersistedLogin from "./utilities/PersistedLogin";
import ProtectedRoute from "./utilities/ProtectedRoute";
import InsteadOutletRoutes from "./utilities/InsteadOutletRoutes";
import useCheckRole from "../hooks/useCheckRole";
import BusinessDataRoutes from "./BusinessDataRoutes";
import TrainingProgramListRoutes from "./TrainingProgramListRoutes";
import MainRouteByRole from "./utilities/MainRouteByRole";
import TraineeEditForm from "../components/Forms/TraineeForms/TraineeEditForm";
import Profile from "../pages/ProfilePage/Profile";
import TraineeProfile from "../pages/ProfilePage/TraineeProfile/TraineeProfile";
import ProfilePage from "../pages/ProfilePage/Profile";

function AppRoutes() {
  const { isAdmin, isTrainee, isTrainer } = useCheckRole();
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={APP_ROUTE.HOME_PAGE} element={<HomePage />}>
          {/* Routes that are related to auth system. */}
          <Route path={"*"} element={<AuthRoutes />} />
        </Route>

        {/* The App data when the user is login */}
        <Route element={<PersistedLogin />}>
          <Route path={APP_ROUTE.HOME_PAGE} element={<App />}>
            {}
            {/* The Shared routes between all users roles. */}
            <Route index element={<MainRouteByRole />} />
            <Route path={APP_ROUTE.SETTINGS_ROUTE} element={<Settings />} />
            <Route path={APP_ROUTE.COMING_SOON} element={<ComingSoonPage />} />
            <Route path={APP_ROUTE.PROFILE_ROUTE} element={<ProfilePage />} />
            <Route
              path={`${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/*`}
              element={<TrainingProgramListRoutes />}
            />

            {/* The admin and trainer shared role routes. */}
            <Route
              element={<ProtectedRoute allowedRole={isAdmin || isTrainer} />}
            >
              <Route
                path={`${APP_ROUTE.SETTINGS_ROUTE}/*`}
                element={<BusinessDataRoutes />}
              />
              <Route
                path={APP_ROUTE.TRAINEES_ROUTE}
                element={
                  <InsteadOutletRoutes
                    InsteadOutletRoutesPaths={APP_ROUTE.TRAINEES_ROUTE}
                  >
                    <Trainees />
                  </InsteadOutletRoutes>
                }
              >
                <Route
                  path={`:id/${APP_ROUTE.PROFILE_ROUTE}`}
                  element={<TraineeProfile />}
                />
                <Route path=":id" element={<TraineeEditForm />} />
                <Route
                  path={APP_ROUTE.TRAINEES_ROUTE_ADD}
                  element={<TraineeAddForm />}
                />
              </Route>
              <Route path={APP_ROUTE.LEADS_ROUTE}>
                <Route index element={<LeadsPage />} />
                <Route
                  path={APP_ROUTE.LEADS_ROUTE_ADD}
                  element={<LeadAddForm />}
                />
                <Route path=":id" element={<LeadEditForm />} />
              </Route>
            </Route>

            {/* The admin role routes. */}
            <Route element={<ProtectedRoute allowedRole={isAdmin} />}>
              <Route path={APP_ROUTE.USERS_ROUTE} element={<UsersPage />} />
            </Route>

            {/* The trainee role routes. */}
            <Route element={<ProtectedRoute allowedRole={isTrainee} />}>
              <Route
                path={APP_ROUTE.MY_WORKOUTS}
                element={<MyWorkoutsPage />}
              />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<h1> not found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
