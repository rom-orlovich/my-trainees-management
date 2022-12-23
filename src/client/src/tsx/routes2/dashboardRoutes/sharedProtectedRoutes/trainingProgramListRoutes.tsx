import { RouteObject } from "react-router-dom";
import { TrainingProgramAddExerciseForm } from "../../../components/Forms/TrainingProgramForms/TrainingProgramAddForm";
import { TrainingProgramEditExerciseForm } from "../../../components/Forms/TrainingProgramForms/TrainingProgramEditForm";
import { TrainingProgramsListAddForm } from "../../../components/Forms/TrainingProgramListForms/TrainingProgramsListAddForm";
import { TrainingProgramsListEditForm } from "../../../components/Forms/TrainingProgramListForms/TrainingProgramsListEditForm";
import ExerciseStatsPage from "../../../pages/ExerciseStatsPage/ExerciseStatsPage";
import TrainingProgramExercises from "../../../pages/TrainingProgramExercisesPage/TrainingProgramExercisesPage";
import TrainingProgramsPage from "../../../pages/TrainingProgramsPage/TrainingProgramsPage";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

export const trainingProgramExercisesRoutes: RouteObject = {
  path: APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE,
  element: <TrainingProgramExercises />,
  children: [
    {
      path: ":exerciseID",
      children: [
        { path: "", element: <TrainingProgramEditExerciseForm /> },
        { path: "stats", element: <ExerciseStatsPage /> },
      ],
    },
    {
      path: APP_ROUTE.TRAINING_PROGRAMS_EXERCISE_ADD,
      element: <TrainingProgramAddExerciseForm />,
    },
  ],
};

export const trainingProgramByIDRoutes: RouteObject = {
  path: ":trainingProgramID",
  children: [
    {
      path: "",
      element: <TrainingProgramsListEditForm />,
    },
    {
      path: APP_ROUTE.TRAINING_PROGRAMS_LIST_ADD,
      element: <TrainingProgramsListAddForm />,
    },
    {
      path: APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE,
      element: <TrainingProgramExercises />,
    },
    trainingProgramExercisesRoutes,
  ],
};

export const trainingProgramsListRoutes: RouteObject = {
  path: APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE,
  element: <TrainingProgramsPage />,
  children: [trainingProgramByIDRoutes],
};
