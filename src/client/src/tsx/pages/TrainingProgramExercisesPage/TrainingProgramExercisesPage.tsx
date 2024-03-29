/* eslint-disable camelcase */
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { trainingProgramsApi } from "../../redux/api/hooksAPI";
import { TrainingProgramExerciseTableAPI } from "../../redux/api/interfaceAPI";
import InsteadOutletRoutes from "../../routes/components/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

import page_style from "../Page.module.scss";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import useCheckRole from "../../hooks/useCheckRole";

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
    exercise: (
      <Link to={`${training_program_row_id}/stats?exercise=${exercise_name}`}>
        {exercise_name}
      </Link>
    ),
    muscle: muscles_group_name,
    equipment: equipment_name,
    reps,
    sets,
    intensity,
    rest,
  };
};

function TrainingProgramExercises() {
  const trainingProgramListID = Number(useParams().trainingProgramID);

  const [exercise, setExercise] = useState<string[]>(["", ""]);
  const [deleteItem] = trainingProgramsApi.useDeleteItemMutation();

  const authState = useGetUserLoginData();
  const { isTrainee } = useCheckRole();
  const queriesOptions = {
    userID: authState.user_id,
    trainingProgramListID,
    exerciseID: exercise[0],
  };

  return (
    <section className={page_style.page_container}>
      <div className={page_style.page_header}>
        <AutocompleteInput<TrainingProgramExerciseTableAPI>
          keys={["exercise_name"]}
          id={"exercise_id"}
          queriesOptions={queriesOptions}
          loadingSpinnerResult={{ nameData: "Exercises" }}
          setSelectOptionValue={setExercise}
          useGetData={trainingProgramsApi.useGetItemsQuery}
          InputLabelProps={{
            InputProps: { placeholder: "Exercise Name" },
            LabelProps: {
              labelText: "Search Exercise",
              htmlFor: "exercise",
            },
          }}
        />
        {!isTrainee && (
          <Link to={`${APP_ROUTE.TRAINING_PROGRAMS_EXERCISE_ADD}`}>
            Add Exercise
          </Link>
        )}
      </div>

      <div className={page_style.page_main_content}>
        <TablePagination
          transformFun={trainingProgramExercisesTransform}
          queriesOptions={{
            mainName: exercise[1],
            ...queriesOptions,
          }}
          // editPagePath={pathName.slice(1)}
          nameData="Program's Exercises"
          deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
          actions={{ edit: true, delete: !isTrainee }}
          getAllQuery={trainingProgramsApi.useGetItemsQuery}
        />
      </div>
    </section>
  );
}

export default function TrainingProgramExercisesPage() {
  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}
    >
      <TrainingProgramExercises />
    </InsteadOutletRoutes>
  );
}
