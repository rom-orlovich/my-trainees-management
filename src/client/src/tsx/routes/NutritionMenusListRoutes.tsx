import React from "react";
import { Route, Routes } from "react-router-dom";
import { TrainingProgramAddExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramAddForm";
import { TrainingProgramEditExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramEditForm";

import TrainingProgramExercises from "../pages/TrainingProgramExercisesPage/TrainingProgramExercisesPage";
import ExerciseStatsPage from "../pages/ExerciseStatsPage/ExerciseStatsPage";

import { APP_ROUTE } from "./appRoutesConstants";
import NutritionMenusListPage from "../pages/NutritionMenusListPage/NutritionMenusListPage";
import { NutritionMenusListEditForm } from "../components/Forms/NutritionMenusListForms/NutritionMenusListEditForm";
import { NutritionMenusListAddForm } from "../components/Forms/NutritionMenusListForms/NutritionMenusListAddForm";
import NutritionMenuPage from "../pages/NutritionMenuPage/NutritionMenuPage";

const NutritionMenusListRoutes = () => (
  <Routes>
    <Route path="" element={<NutritionMenusListPage />} />
    <Route path=":id" element={<NutritionMenusListEditForm />}></Route>
    <Route
      path={`:id/${APP_ROUTE.NUTRITION_MENUS_LIST_ADD}`}
      element={<NutritionMenusListAddForm />}
    />
    <Route
      path={`:id/${APP_ROUTE.NUTRITION_MENU_ROUTE}`}
      element={<NutritionMenuPage />}
    >
      <Route path={`:exerciseID/stats`} element={<ExerciseStatsPage />} />
      <Route
        path={`${APP_ROUTE.TRAINING_PROGRAMS_EXERCISE_ADD}`}
        element={<TrainingProgramAddExerciseForm />}
      />
      <Route path={`:id`} element={<TrainingProgramEditExerciseForm />}></Route>
    </Route>
  </Routes>
);

export default NutritionMenusListRoutes;
