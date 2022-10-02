import React, { useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { exercisesApi, trainingProgramsApi } from "../../redux/api/hooksAPI";
import {
  ExercisesTableAPI,
  TrainingProgramExerciseTableAPI,
} from "../../redux/api/interfaceAPI";
import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

import page_style from "../Page.module.scss";
const trainingProgramExercisesTransform = ({
  training_programs_list_id,
  exercise_id,
  ...data
}: TrainingProgramExerciseTableAPI) => {
  const {
    training_program_row_id,
    exercise_name,
    muscles_group_name,
    equipment_name,
    reps,
    sets,
    intensity,
    rest,
    rpe,
  } = data;
  return {
    training_program_row_id,
    exercise_name,
    muscles_group: muscles_group_name,
    equipment_name,
    reps,
    sets,
    intensity,
    rest,
    rpe,
  };
};

function TrainingProgramExercises() {
  const trainingProgramListID = Number(useParams().id);
  const [exercise, setExercise] = useState<string[]>(["", ""]);
  const [deleteItem] = trainingProgramsApi.useDeleteItemMutation();
  const pathName = useLocation().pathname;

  return (
    <MainRoute mainRoutes={APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}>
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<ExercisesTableAPI>
            keys={["exercise_name"]}
            id={"exercise_id"}
            loadingSpinnerResult={{ nameData: "Exercises" }}
            setSelectOptionValue={setExercise}
            useGetData={exercisesApi.useGetItemsQuery}
            InputLabelProps={{
              InputProps: { placeholder: "Exercise Name" },
              LabelProps: {
                labelText: "Search Exercise",
                htmlFor: "exercise",
              },
            }}
          />
          <Link to={`${APP_ROUTE.TRAINING_PROGRAMS_EXERCISE_ADD}`}>
            Add Exercise
          </Link>
        </div>

        <div className={page_style.page_main_content}>
          <MainRoute mainRoutes={APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}>
            <TablePagination
              transformFun={trainingProgramExercisesTransform}
              queriesOptions={{ trainingProgramListID, name: exercise[1] }}
              mainRoute={pathName.slice(1)}
              nameData="Training Program Exercises"
              deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
              getAllQuery={trainingProgramsApi.useGetItemsQuery}
            />
          </MainRoute>
        </div>
      </section>
    </MainRoute>
  );
}

export default TrainingProgramExercises;
