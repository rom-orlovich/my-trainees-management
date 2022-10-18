import React from "react";
import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { exercisesApi } from "../../../redux/api/hooksAPI";
import { ExercisesTableAPI } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ExerciseForm } from "./ExerciseForm";

export function ExerciseEditForm() {
  const id = Number(useParams().id);
  const [updateItem, state] = exercisesApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  const { data, isLoading, isFetching, isError } =
    exercisesApi.useGetItemByIDQuery({ id, ...queriesOptions });

  const handleSubmit = (body: ExercisesTableAPI) =>
    updateFunction({
      updateItem,
      id,
    })(body);

  return (
    <LoadingSpinner
      nameData="Exercise"
      stateData={{ data, isLoading, isFetching, isError }}
    >
      <ExerciseForm
        editMode={true}
        onSubmit={handleSubmit}
        defaultValues={data}
      ></ExerciseForm>
    </LoadingSpinner>
  );
}
