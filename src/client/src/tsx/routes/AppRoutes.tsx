import React from "react";
import { Route, Routes } from "react-router-dom";

import { LeadAddForm } from "../components/Forms/LeadForms/LeadAddForm";
import LeadEditForm from "../components/Forms/LeadForms/LeadEditForm";

import LeadsPage from "../pages/LeadsPage/LeadsPage";

import Settings from "../pages/SettingsPage/SettingsPage";

import { APP_ROUTE } from "./appRoutesConstants";
import UsersPage from "../pages/UsersPage/UsersPage";

import ComingSoonPage from "../pages/ComingSoonPage/ComingSoonPage";
import MyWorkoutsPage from "../pages/MyWorkoutsPage/MyWorkoutsPage";
import AuthRoutes from "./AuthRoutes";

import PersistedLogin from "./utilities/PersistedLogin";
import ProtectedRoute from "./utilities/ProtectedRoute";

import useCheckRole from "../hooks/useCheckRole";
import BusinessDataRoutes from "./BusinessDataRoutes";
import TrainingProgramListRoutes from "./TrainingProgramListRoutes";
import MainRouteByRole from "./utilities/MainRouteByRole";

import ProfilePage from "../pages/ProfilePage/Profile";
import TraineesRoutes from "./TraineesRoutes";
import { MeasureAddForm } from "../components/Forms/MeasuresForms/MeasureAddForm";

import FinancesPage from "../pages/FinancesPage/FinancesPage";
import { IncomeAddForm } from "../components/Forms/IncomeForms/IncomeAddForm";

import IncomeEditForm from "../components/Forms/IncomeForms/IncomeEditForm";
import ExpenseEditForm from "../components/Forms/ExpenseForms/ExpenseEditForm";
import { ExpenseAddForm } from "../components/Forms/ExpenseForms/ExpenseAddForm";
import SchedulePage from "../pages/SchedulePage/SchedulePage";
import ParticipantsGroupPage from "../pages/ParticipantsGroupPage/ParticipantsGroupPage";
import TraineeStatsPage from "../pages/StatsPages/TraineeStatsPage/TraineeStatsPage";

import LeadsStatsPage from "../pages/StatsPages/LeadsStatsPage/LeadsStatsPage";
import FinanceStatsPage from "../pages/StatsPages/FinancesStatsPage/FinancesStatsPage";

import NutritionMenusListRoutes from "./NutritionMenusListRoutes";
import MeasureEditForm, {
  MeasureEditFormNavigate,
} from "../components/Forms/MeasuresForms/MeasureEditForm";
import MyNutritionMenusPage from "../pages/MyNutritionMenus/MyNutritionMenusPage";
import TraineeEditForm from "../components/Forms/TraineeForms/TraineeEditForm";
import NutritionQuestionnaireEditForm from "../components/Forms/NutritionQuestionnaireForms/NutritionQuestionnaireEditForm";
import { NutritionQuestionnaireAddForm } from "../components/Forms/NutritionQuestionnaireForms/NutritionQuestionnaireAddForm";
import Dashboard from "../Dashboard";

function AppRoutes() {
  const { isAdmin, isTrainee, isTrainer } = useCheckRole();

  return (
    <Routes>
      {/* The App data when the user is login */}
      <Route element={<PersistedLogin />}>
        <Route path={"*"} element={<AuthRoutes />} />
        <Route path={APP_ROUTE.HOME_PAGE} element={<Dashboard />}>
          <Route index element={<MainRouteByRole />} />
          <Route
            element={
              <ProtectedRoute allowedRole={isAdmin || isTrainer || isTrainee} />
            }
          >
            {/* The Shared routes between all users roles. */}

            <Route path={APP_ROUTE.SETTINGS_ROUTE} element={<Settings />} />
            {/* <Route
              path={`${APP_ROUTE.COMING_SOON}/*`}
              element={<ComingSoonPage />}
            /> */}

            {isTrainee && (
              <Route
                path={`${APP_ROUTE.TRAINEES_ROUTE}/:id`}
                element={<TraineeEditForm />}
              />
            )}

            <Route path={APP_ROUTE.PROFILE_ROUTE} element={<ProfilePage />}>
              <Route
                element={<ProtectedRoute allowedRole={isAdmin || isTrainer} />}
              >
                <Route path={APP_ROUTE.STATS_ROUTE}>
                  <Route
                    path={APP_ROUTE.TRAINEES_ROUTE}
                    element={<TraineeStatsPage />}
                  />
                  <Route
                    path={APP_ROUTE.LEADS_ROUTE}
                    element={<LeadsStatsPage />}
                  />
                  <Route
                    path={APP_ROUTE.FINANCES_ROUTE}
                    element={<FinanceStatsPage />}
                  />
                </Route>
              </Route>
              <Route path={`${APP_ROUTE.NUTRITION_QUESTIONNAIRE_ROUTE}`}>
                <Route
                  path={APP_ROUTE.NUTRITION_QUESTIONNAIRE_EDIT_ROUTE}
                  element={<NutritionQuestionnaireEditForm />}
                />
                <Route
                  path={APP_ROUTE.NUTRITION_QUESTIONNAIRE_ADD_ROUTE}
                  element={<NutritionQuestionnaireAddForm />}
                />
              </Route>
            </Route>
          </Route>

          <Route path={APP_ROUTE.MEASURES_ROUTE}>
            <Route path={""} element={<MeasureEditFormNavigate />} />
            <Route
              path={APP_ROUTE.MEASURE_EDIT}
              element={<MeasureEditForm />}
            />
            <Route path={APP_ROUTE.MEASURE_ADD} element={<MeasureAddForm />} />
          </Route>

          <Route
            path={`${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}//*`}
            element={<TrainingProgramListRoutes />}
          />

          <Route
            path={`${APP_ROUTE.NUTRITION_MENUS_LIST_ROUTE}//*`}
            element={<NutritionMenusListRoutes />}
          />

          <Route path={APP_ROUTE.SCHEDULE_ROUTE}>
            <Route index element={<SchedulePage />} />
          </Route>

          <Route
            path={`${APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}/:id/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}}`}
          >
            <Route index element={<ParticipantsGroupPage />} />
          </Route>

          {/* The admin and trainer shared role routes. */}
          <Route
            element={<ProtectedRoute allowedRole={isAdmin || isTrainer} />}
          >
            <Route
              path={`${APP_ROUTE.SETTINGS_ROUTE}/*`}
              element={<BusinessDataRoutes />}
            />

            <Route
              path={`${APP_ROUTE.TRAINEES_ROUTE}/*`}
              element={<TraineesRoutes />}
            />

            <Route path={APP_ROUTE.LEADS_ROUTE}>
              <Route index element={<LeadsPage />} />
              <Route
                path={APP_ROUTE.LEADS_ROUTE_ADD}
                element={<LeadAddForm />}
              />
              <Route path=":id" element={<LeadEditForm />} />
            </Route>

            <Route path={APP_ROUTE.FINANCES_ROUTE}>
              <Route index element={<FinancesPage />} />
              <Route path={APP_ROUTE.INCOMES_ROUTE}>
                <Route path=":id" element={<IncomeEditForm />} />
                <Route
                  path={APP_ROUTE.INCOMES_ADD}
                  element={<IncomeAddForm />}
                />
              </Route>
              <Route path={APP_ROUTE.EXPENSES_ROUTE}>
                <Route path=":id" element={<ExpenseEditForm />} />
                <Route
                  path={APP_ROUTE.EXPENSES_ADD}
                  element={<ExpenseAddForm />}
                />
              </Route>
            </Route>
          </Route>
          {/* The admin role routes. */}
          <Route element={<ProtectedRoute allowedRole={isAdmin} />}>
            <Route path={APP_ROUTE.USERS_ROUTE}>
              <Route path="" element={<UsersPage />} />
              <Route path=":id" element={<ComingSoonPage />} />
            </Route>
          </Route>

          {/* The trainee role routes. */}
          <Route element={<ProtectedRoute allowedRole={isTrainee} />}>
            <Route
              path={APP_ROUTE.MY_WORKOUTS_ROUTE}
              element={<MyWorkoutsPage />}
            />
            <Route
              path={APP_ROUTE.MY_NUTRITION_MENUS_LIST_ROUTE}
              element={<MyNutritionMenusPage />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
