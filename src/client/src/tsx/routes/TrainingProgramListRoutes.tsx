import React from "react";
import { Route, Routes } from "react-router-dom";
import { TrainingProgramAddExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramAddForm";
import { TrainingProgramEditExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramEditForm";
import { TrainingProgramsListAddForm } from "../components/Forms/TrainingProgramListForms/TrainingProgramsListAddForm";
import { TrainingProgramsListEditForm } from "../components/Forms/TrainingProgramListForms/TrainingProgramsListEditForm";
import TrainingProgramExercises from "../pages/TrainingProgramExercisesPage/TrainingProgramExercisesPage";
import ExerciseStatsPage from "../pages/ExerciseStatsPage/ExerciseStatsPage";
import TrainingProgramsPage from "../pages/TrainingProgramsPage/TrainingProgramsPage";
import { APP_ROUTE } from "../routes2/appRoutesConstants";

const TrainingProgramListRoutes = () => (
  <Routes>
    <Route path="" element={<TrainingProgramsPage />} />
    <Route
      path=":trainingProgramID"
      element={<TrainingProgramsListEditForm />}
    />
    <Route
      path={`:trainingProgramID/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD}`}
      element={<TrainingProgramsListAddForm />}
    />
    <Route
      path={`:trainingProgramID/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}`}
      element={<TrainingProgramExercises />}
    >
      <Route path={`:exerciseID/stats`} element={<ExerciseStatsPage />} />
      <Route
        path={`${APP_ROUTE.TRAINING_PROGRAMS_EXERCISE_ADD}`}
        element={<TrainingProgramAddExerciseForm />}
      />
      <Route
        path={`:exerciseID`}
        element={<TrainingProgramEditExerciseForm />}
      ></Route>
    </Route>
  </Routes>
);

export default TrainingProgramListRoutes;
