import React from "react";
import { Route, Routes } from "react-router-dom";
import { TrainingProgramAddExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramAddForm";
import { TrainingProgramEditExerciseForm } from "../components/Forms/TrainingProgramForms/TrainingProgramEditForm";
import { TrainingProgramsListAddForm } from "../components/Forms/TrainingProgramListForms/TrainingProgramsListAddForm";
import { TrainingProgramsListEditForm } from "../components/Forms/TrainingProgramListForms/TrainingProgramsListEditForm";
import TrainingProgramExercises from "../pages/TrainingProgramExercisesPage/TrainingProgramExercisesPage";
import TrainingProgramsExerciseStatsPage from "../pages/TrainingProgramsExerciseStatsPage/TrainingProgramsExerciseStatsPage";
import TrainingProgramsPage from "../pages/TrainingProgramsPage/TrainingProgramsPage";
import { APP_ROUTE } from "./appRoutesConstants";
import InsteadOutletRoutes from "./utilities/InsteadOutletRoutes";

const TrainingProgramListRoutes = () => (
  <Routes>
    <Route index element={<TrainingProgramsPage />} />
    <Route path={`:id`} element={<TrainingProgramsListEditForm />}></Route>
    <Route
      path={`:id/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD}`}
      element={<TrainingProgramsListAddForm />}
    ></Route>
    <Route
      path={`:id/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}`}
      element={
        <InsteadOutletRoutes
          InsteadOutletRoutesPaths={APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}
        >
          <TrainingProgramExercises />
        </InsteadOutletRoutes>
      }
    >
      <Route
        path={`:exerciseID/stats`}
        element={<TrainingProgramsExerciseStatsPage />}
      />
      <Route
        path={`${APP_ROUTE.TRAINING_PROGRAMS_EXERCISE_ADD}`}
        element={<TrainingProgramAddExerciseForm />}
      />
      <Route path={`:id`} element={<TrainingProgramEditExerciseForm />}></Route>
    </Route>
  </Routes>
);

export default TrainingProgramListRoutes;
