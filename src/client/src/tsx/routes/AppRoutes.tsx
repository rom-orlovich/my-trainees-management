import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import { CityAddForm } from "../components/Forms/CityForms/CityAddForm";
import { CityEditForm } from "../components/Forms/CityForms/CityEditForm";
import { EquipmentAddForm } from "../components/Forms/EquipmentForms/EquipmentAddForm";
import { EquipmentEditForm } from "../components/Forms/EquipmentForms/EquipmentEditForm";
import { ExerciseAddForm } from "../components/Forms/ExerciseForms/ExerciseAddForm";
import { ExerciseEditForm } from "../components/Forms/ExerciseForms/ExerciseEditForm";
import { LeadAddForm } from "../components/Forms/LeadForms/LeadAddForm";
import LeadEditForm from "../components/Forms/LeadForms/LeadEditForm";
import { LocationAddForm } from "../components/Forms/LocationForms/LocationAddForm";
import { LocationEditForm } from "../components/Forms/LocationForms/LocationEditForm";
import { MusclesGroupAddForm } from "../components/Forms/MusclesGroupForms/MusclesGroupAddForm";
import { MusclesGroupEditForm } from "../components/Forms/MusclesGroupForms/MusclesGroupEditForm";

import TraineeAddForm from "../components/Forms/TraineeForms/TraineeAddForm";
import { TrainingProgramAddExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramAddForm";
import { TrainingProgramEditExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramEditForm";
import { TrainingProgramsListAddForm } from "../components/Forms/TrainingProgramListForms/TrainingProgramsListAddForm";
import { TrainingProgramsListEditForm } from "../components/Forms/TrainingProgramListForms/TrainingProgramsListEditForm";
import CitiesPage from "../pages/CitiesPage/CitiesPage";

import EquipmentsListPage from "../pages/EquipmentsListPage/EquipmentsListPage";
import ExercisesPage from "../pages/ExercisesPage/ExercisesPage";
import HomePage from "../pages/HomePage/HomePage";
import LeadsPage from "../pages/LeadsPage/LeadsPage";
import LocationsListPage from "../pages/LocationsPage/LocationsPage";
import LoginPage from "../pages/SignInPage/LoginPage";
import MusclesGroupPage from "../pages/MusclesGroupPage/MusclesGroupPage";

import Settings from "../pages/SettingsPage/SettingsPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

import TraineeProfile from "../pages/TraineeProfile/TraineeProfile";
import Trainees from "../pages/TraineesPage/TraineesPage";
import TrainingProgramExercises from "../pages/TrainingProgramExercisesPage/TrainingProgramExercisesPage";
import TrainingProgramsPage from "../pages/TrainingProgramsPage/TrainingProgramsPage";
import MainRoute from "./MainRoute";
import PersistedLogin from "./PersistedLogin";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import { APP_ROUTE } from "./routesConstants";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import UsersPage from "../pages/UsersPage/UsersPage";
function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={APP_ROUTE.HOME_PAGE} element={<HomePage />}>
          <Route path={APP_ROUTE.LOGIN_ROUTE} element={<LoginPage />}></Route>
          <Route path={APP_ROUTE.SIGN_UP} element={<SignUpPage />}></Route>
        </Route>
        <Route element={<PersistedLogin />}>
          <Route element={<ProtectedRoute />}>
            <Route path={APP_ROUTE.HOME_PAGE} element={<App />}>
              <Route
                path={APP_ROUTE.PROFILE_ROUTE}
                element={<ProfilePage />}
              ></Route>
              <Route index element={<Trainees />} />
              <Route path={APP_ROUTE.TRAINEES_ROUTE}>
                <Route index element={<Trainees />} />
                <Route path=":id" element={<TraineeProfile />} />
                <Route
                  path={APP_ROUTE.TRAINEES_ROUTE_ADD}
                  element={<TraineeAddForm />}
                />
              </Route>
              <Route index element={<UsersPage />} />
              <Route path={APP_ROUTE.USERS_ROUTE}>
                <Route index element={<UsersPage />} />
                {/* <Route path=":id" element={<TraineeProfile />} />
                <Route
                  path={APP_ROUTE.TRAINEES_ROUTE_ADD}
                  element={<TraineeAddForm />}
                /> */}
              </Route>

              <Route path={APP_ROUTE.LEADS_ROUTE}>
                <Route index element={<LeadsPage />} />
                <Route
                  path={APP_ROUTE.LEADS_ROUTE_ADD}
                  element={<LeadAddForm />}
                />
                <Route path=":id" element={<LeadEditForm />}></Route>
              </Route>

              <Route path={APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}>
                <Route index element={<TrainingProgramsPage />}></Route>
                <Route
                  path={`:id`}
                  element={<TrainingProgramsListEditForm />}
                ></Route>
                <Route
                  path={`:id/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD}`}
                  element={<TrainingProgramsListAddForm />}
                ></Route>
                <Route
                  path={`:id/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}`}
                  element={
                    <MainRoute
                      mainRoutes={APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}
                    >
                      <TrainingProgramExercises />
                    </MainRoute>
                  }
                >
                  <Route
                    path={`${APP_ROUTE.TRAINING_PROGRAMS_EXERCISE_ADD}`}
                    element={<TrainingProgramAddExerciseForm />}
                  ></Route>
                  <Route
                    path={`:id`}
                    element={<TrainingProgramEditExerciseForm />}
                  ></Route>
                </Route>
              </Route>

              <Route path={APP_ROUTE.SETTINGS_ROUTE} element={<Settings />}>
                <Route
                  path={APP_ROUTE.EXERCISES_LIST_ROUTE}
                  element={<ExercisesPage />}
                >
                  <Route
                    path={APP_ROUTE.EXERCISE_ADD}
                    element={<ExerciseAddForm />}
                  ></Route>
                  <Route path=":id" element={<ExerciseEditForm />}></Route>
                </Route>
                <Route
                  path={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}
                  element={<EquipmentsListPage />}
                >
                  <Route
                    path={APP_ROUTE.EQUIPMENT_ADD}
                    element={<EquipmentAddForm />}
                  ></Route>
                  <Route path=":id" element={<EquipmentEditForm />}></Route>
                </Route>
                <Route
                  path={APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}
                  element={<MusclesGroupPage />}
                >
                  <Route
                    path={APP_ROUTE.MUSCLES_GROUP_ADD}
                    element={<MusclesGroupAddForm />}
                  />
                  <Route path=":id" element={<MusclesGroupEditForm />}></Route>
                </Route>
                <Route
                  path={APP_ROUTE.LOCATION_ROUTE}
                  element={<LocationsListPage />}
                >
                  <Route
                    path={APP_ROUTE.LOCATION_ROUTE_ADD}
                    element={<LocationAddForm />}
                  />
                  <Route path=":id" element={<LocationEditForm />} />
                </Route>

                <Route path={APP_ROUTE.CITY_ROUTE} element={<CitiesPage />}>
                  <Route
                    path={APP_ROUTE.CITY_ROUTE_ADD}
                    element={<CityAddForm />}
                  />
                  <Route path=":id" element={<CityEditForm />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<h1> not found</h1>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
