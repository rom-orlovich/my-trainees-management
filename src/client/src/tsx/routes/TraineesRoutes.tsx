import React from "react";
import { Route, Routes } from "react-router-dom";
import { NutritionQuestionnaireAddForm } from "../components/Forms/NutritionQuestionnaireForms/NutritionQuestionnaireAddForm";
import NutritionQuestionnaireEditForm from "../components/Forms/NutritionQuestionnaireForms/NutritionQuestionnaireEditForm";

import TraineeAddForm from "../components/Forms/TraineeForms/TraineeAddForm";
import TraineeEditForm from "../components/Forms/TraineeForms/TraineeEditForm";
import TraineeProfile from "../pages/ProfilePage/TraineeProfile/TraineeProfile";
import TraineesPage from "../pages/TraineesPage/TraineesPage";
import { APP_ROUTE } from "./appRoutesConstants";

const TraineesRoutes = () => (
  <Routes>
    <Route path="" element={<TraineesPage />} />
    <Route path=":id">
      <Route index element={<TraineeEditForm />} />
      <Route
        path={APP_ROUTE.PROFILE_ROUTE}
        element={<TraineeProfile />}
      ></Route>
      <Route path={APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE} />

      <Route
        path={`${APP_ROUTE.PROFILE_ROUTE}/${APP_ROUTE.NUTRITION_QUESTIONNAIRE_ROUTE}`}
      >
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

    <Route path={APP_ROUTE.TRAINEES_ROUTE_ADD} element={<TraineeAddForm />} />
  </Routes>
);

export default TraineesRoutes;
