import React from "react";
import { traineesApi } from "../../../redux/api/hooksAPI";

import {
  TraineeTableAPI,
  TraineesTableAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppSelector } from "../../../redux/hooks";

import { formatDate } from "../../../utilities/helpersFun";

import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm from "./TraineeForm";

export function TraineeEditForm({ id }: { id?: number }) {
  const state = useAppSelector((state) => state.tablesPaginationState);

  const { trainee, isLoading, isFetching, isError } =
    traineesApi.useGetItemsQuery(
      { page: state["trainees"] },

      {
        selectFromResult: (data) => {
          return {
            ...data,
            trainee: data.data?.data.find((el) => el.profile_id === Number(id)),
          };
        },
      }
    );
  const [updateTrainee] = traineesApi.useUpdateItemMutation();

  const handleSubmit = (body: TraineesTableAPI) => {
    const {
      profile_id,
      street,
      training_programs_list_id,
      nutrition_programs_list_id,
      city_name,

      ...rest
    } = body as TraineeTableAPI;

    updateFunction({ id: trainee?.profile_id || 0, updateItem: updateTrainee })(
      rest
    );
  };

  return (
    <LoadingSpinner
      nameData="Trainee"
      stateData={{
        data: trainee,
        isError,
        isFetching,
        isLoading,
      }}
    >
      {(data) => (
        <TraineeForm
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={{
            ...data,
            date_join: formatDate(data.date_join) as any,
            birthday: formatDate(data?.birthday) as any,
          }}
        ></TraineeForm>
      )}
    </LoadingSpinner>
  );
}

export default TraineeEditForm;
