import React from "react";
import { Route, Routes } from "react-router-dom";
import { TrainingProgramAddExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramAddForm";
import { TrainingProgramEditExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramEditForm";
import { TrainingProgramsListAddForm } from "../components/Forms/TrainingProgramListForms/TrainingProgramsListAddForm";
import { TrainingProgramsListEditForm } from "../components/Forms/TrainingProgramListForms/TrainingProgramsListEditForm";
import TrainingProgramExercises from "../pages/TrainingProgramExercisesPage/TrainingProgramExercisesPage";
import ExerciseStatsPage from "../pages/ExerciseStatsPage/ExerciseStatsPage";

import { APP_ROUTE } from "./appRoutesConstants";
import NutritionMenusListPage from "../pages/NutritionMenusListPage/NutritionMenusListPage";

const NutritionMenusListRoutes = () => (
  <Routes>
    <Route path="" element={<NutritionMenusListPage />} />
    <Route path=":id" element={<TrainingProgramsListEditForm />}></Route>
    <Route
      path={`:id/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD}`}
      element={<TrainingProgramsListAddForm />}
    />
    <Route
      path={`:id/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}`}
      element={<TrainingProgramExercises />}
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
