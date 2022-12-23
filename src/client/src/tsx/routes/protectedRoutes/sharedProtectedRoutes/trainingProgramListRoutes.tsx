import { RouteObject } from "react-router-dom";
import { TrainingProgramAddExerciseForm } from "../../../components/Forms/TrainingProgramForms/TrainingProgramAddForm";
import { TrainingProgramEditExerciseForm } from "../../../components/Forms/TrainingProgramForms/TrainingProgramEditForm";
import { TrainingProgramsListAddForm } from "../../../components/Forms/TrainingProgramListForms/TrainingProgramsListAddForm";
import { TrainingProgramsListEditForm } from "../../../components/Forms/TrainingProgramListForms/TrainingProgramsListEditForm";
import ExerciseStatsPage from "../../../pages/ExerciseStatsPage/ExerciseStatsPage";
import TrainingProgramExercisesPage from "../../../pages/TrainingProgramExercisesPage/TrainingProgramExercisesPage";

import TrainingProgramsPage from "../../../pages/TrainingProgramsPage/TrainingProgramsPage";
import { APP_ROUTE } from "../../appRoutesConstants";

export const exerciseByIDRoutes: RouteObject = {
  path: ":exerciseID",
  children: [
    { path: "", element: <TrainingProgramEditExerciseForm /> },
    { path: "stats", element: <ExerciseStatsPage /> },
  ],
};

export const trainingProgramExercisesRoutes: RouteObject = {
  path: APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE,
  element: <TrainingProgramExercisesPage />,
  children: [
    {
      path: APP_ROUTE.TRAINING_PROGRAMS_EXERCISE_ADD,
      element: <TrainingProgramAddExerciseForm />,
    },
    exerciseByIDRoutes,
  ],
};

export const trainingProgramByIDRoutes: RouteObject = {
  path: ":trainingProgramID",
  children: [
    {
      path: "",
      element: <TrainingProgramsListEditForm />,
    },

    trainingProgramExercisesRoutes,
  ],
};

export const trainingProgramsListRoutes: RouteObject = {
  path: APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE,
  element: <TrainingProgramsPage />,
  children: [
    {
      path: APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD,
      element: <TrainingProgramsListAddForm />,
    },
    trainingProgramByIDRoutes,
  ],
};
