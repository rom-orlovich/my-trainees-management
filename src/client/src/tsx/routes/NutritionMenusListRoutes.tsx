import React from "react";
import { Route, Routes } from "react-router-dom";
import { TrainingProgramAddExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramAddForm";
import { TrainingProgramEditExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramEditForm";

import ExerciseStatsPage from "../pages/ExerciseStatsPage/ExerciseStatsPage";

import { APP_ROUTE } from "../routes2/appRoutesConstants";
import NutritionMenusListPage from "../pages/NutritionMenusListPage/NutritionMenusListPage";
import { NutritionMenusListEditForm } from "../components/Forms/NutritionMenusListForms/NutritionMenusListEditForm";
import { NutritionMenusListAddForm } from "../components/Forms/NutritionMenusListForms/NutritionMenusListAddForm";
import NutritionMenuPage from "../pages/NutritionMenuPage/NutritionMenuPage";

const NutritionMenusListRoutes = () => (
  <Routes>
    <Route path="" element={<NutritionMenusListPage />} />
    <Route path=":nutritionMenuID" element={<NutritionMenusListEditForm />} />
    <Route
      path={`:nutritionMenuID/${APP_ROUTE.NUTRITION_MENUS_LIST_ADD}`}
      element={<NutritionMenusListAddForm />}
    />
    <Route
      path={`:nutritionMenuID/${APP_ROUTE.NUTRITION_MENU_ROUTE}`}
      element={<NutritionMenuPage />}
    />
  </Routes>
);

export default NutritionMenusListRoutes;
