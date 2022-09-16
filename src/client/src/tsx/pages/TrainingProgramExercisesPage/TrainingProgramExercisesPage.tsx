import React, { useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { exercisesApi, trainingProgramsApi } from "../../redux/api/hooksAPI";
import {
  ExercisesTable,
  TrainingProgramExercise,
} from "../../redux/api/interfaceAPI";
import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { getEndPoint } from "../../utilities/helpersFun";
import page_style from "../Page.module.scss";
const trainingProgramExercisesTransform = ({
  note_id,
  training_programs_list_id,
  exercise_id,
  ...data
}: TrainingProgramExercise) => {
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
    name_topic,
    note_text,
  } = data;
  return {
    training_program_row_id,
    exercise_name,
    muscles_group_name,
    equipment_name,
    reps,
    sets,
    intensity,
    rest,
    rpe,
    name_topic,
    note_text,
  };
};

function TrainingProgramExercises() {
  const trainingProgramListID = Number(useParams().id);
  const [exercise, setExercise] = useState<string[]>(["", ""]);

  const pathName = useLocation().pathname;
  console.log(pathName);
  return (
    <MainRoute mainRoutes={APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}>
      <section className={page_style.page_container}>
        <div className={page_style.page_header}>
          <AutocompleteInput<ExercisesTable>
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
              // mainRoute={`{${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/${trainingProgramListID}/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}}`}
              mainRoute={pathName.slice(1)}
              nameData="Training Program Exercises"
              getAllQuery={trainingProgramsApi.useGetItemsQuery}
            />
          </MainRoute>
        </div>
      </section>
    </MainRoute>
  );
}

export default TrainingProgramExercises;
