import { RouteObject } from "react-router-dom";
import { MeasureAddForm } from "../../../components/Forms/MeasuresForms/MeasureAddForm";
import MeasureEditForm, {
  MeasureEditFormNavigate,
} from "../../../components/Forms/MeasuresForms/MeasureEditForm";
import { NutritionQuestionnaireAddForm } from "../../../components/Forms/NutritionQuestionnaireForms/NutritionQuestionnaireAddForm";
import NutritionQuestionnaireEditForm from "../../../components/Forms/NutritionQuestionnaireForms/NutritionQuestionnaireEditForm";
import TraineeEditForm from "../../../components/Forms/TraineeForms/TraineeEditForm";
import ProfilePage from "../../../pages/ProfilePage/Profile";
import FinanceStatsPage from "../../../pages/StatsPages/FinancesStatsPage/FinancesStatsPage";
import LeadsStatsPage from "../../../pages/StatsPages/LeadsStatsPage/LeadsStatsPage";
import TraineeStatsPage from "../../../pages/StatsPages/TraineeStatsPage/TraineeStatsPage";
import { APP_ROUTE } from "../../appRoutesConstants";
import { AdminOrTrainerProtectedRoutes } from "../../utilities/ProtectedRoute";

export const profilePageStats: RouteObject = {
  path: "",
  element: <AdminOrTrainerProtectedRoutes />,
  children: [
    {
      path: APP_ROUTE.STATS_ROUTE,
      children: [
        { path: APP_ROUTE.TRAINEES_ROUTE, element: <TraineeStatsPage /> },
        { path: APP_ROUTE.LEADS_ROUTE, element: <LeadsStatsPage /> },
        { path: APP_ROUTE.FINANCES_ROUTE, element: <FinanceStatsPage /> },
      ],
    },
  ],
};

export const nutritionQuestionnaireRoutes: RouteObject = {
  path: APP_ROUTE.NUTRITION_QUESTIONNAIRE_ROUTE,
  children: [
    {
      path: APP_ROUTE.NUTRITION_QUESTIONNAIRE_EDIT_ROUTE,
      element: <NutritionQuestionnaireEditForm />,
    },
    {
      path: APP_ROUTE.NUTRITION_QUESTIONNAIRE_ADD_ROUTE,
      element: <NutritionQuestionnaireAddForm />,
    },
  ],
};

export const measureRoutes: RouteObject = {
  path: APP_ROUTE.MEASURES_ROUTE,
  children: [
    { path: "", element: <MeasureEditFormNavigate /> },
    { path: APP_ROUTE.MEASURE_EDIT, element: <MeasureEditForm /> },
    { path: APP_ROUTE.MEASURE_ADD, element: <MeasureAddForm /> },
  ],
};

export const traineeEditDetailsRoute = {
  path: `${APP_ROUTE.TRAINEES_ROUTE}/:traineeID`,
  element: <TraineeEditForm />,
};

export const profileRoute: RouteObject = {
  path: ":profileID",
  element: <ProfilePage />,
};

export const profileRoutes: RouteObject = {
  path: APP_ROUTE.PROFILE_ROUTE,
  element: <ProfilePage />,
  children: [
    profilePageStats,
    traineeEditDetailsRoute,
    nutritionQuestionnaireRoutes,
    measureRoutes,
  ],
};
