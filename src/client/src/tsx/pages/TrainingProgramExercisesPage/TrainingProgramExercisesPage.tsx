/* eslint-disable camelcase */
import React, { useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AutocompleteInput from "../../components/baseComponents/RHF-Components/AutocompleteInput/AutocompleteInput";
import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { trainingProgramsApi } from "../../redux/api/hooksAPI";
import { TrainingProgramExerciseTableAPI } from "../../redux/api/interfaceAPI";
import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import {
  capitalFirstLetter,
  deleteFunMutation,
} from "../../utilities/helpersFun";

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
      <Link to={`${exercise_id}/stats?exercise=${exercise_name}`}>
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
  const trainingProgramListID = Number(useParams().id);

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
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}
    >
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
          <InsteadOutletRoutes
            InsteadOutletRoutesPaths={
              APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE
            }
          >
            <TablePagination
              transformFun={trainingProgramExercisesTransform}
              queriesOptions={{
                mainName: exercise[1],
                ...queriesOptions,
              }}
              // editPagePath={pathName.slice(1)}
              nameData="Program's Exercises"
              deleteItemFun={
                !isTrainee
                  ? (id) => deleteFunMutation(id, deleteItem)
                  : undefined
              }
              getAllQuery={trainingProgramsApi.useGetItemsQuery}
            />
          </InsteadOutletRoutes>
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default TrainingProgramExercises;
