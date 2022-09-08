import React from "react";
import { exercisesApi } from "../../../redux/api/hooksAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ExerciseForm } from "./ExerciseForm";

export function ExerciseEditForm({ id }: { id: number }) {
  const [updateItem, state] = exercisesApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    exercisesApi.useGetItemByIDQuery(id);
  const handleSubmit = updateFunction({
    updateItem,
    id,
  });

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
