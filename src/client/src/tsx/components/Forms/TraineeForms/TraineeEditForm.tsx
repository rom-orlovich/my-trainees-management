import React from "react";
import { traineesApi } from "../../../redux/api/hooksAPI";

import { TraineeGetRes } from "../../../redux/api/interfaceAPI";
import { useAppSelector } from "../../../redux/hooks";

import { formatDate } from "../../../utlities/helpersFun";

import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm, { TraineeWithMemberProps } from "./TraineeForm";

export function TraineeEditForm({
  id,
}: // heading,
// ...rest
// Partial<FormProps>
// &
{
  id?: number;
}) {
  const state = useAppSelector((state) => state.tablesPagintationState);

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

  const handleSubmit = (body: TraineeWithMemberProps) => {
    const {
      profile_id,
      street,
      training_programs_list_id,
      nutrition_programs_list_id,
      city_name,

      ...rest
    } = body as TraineeGetRes;

    updateFunction({ id: trainee?.profile_id || 0, updateItem: updateTrainee })(
      rest
    ).then(() => {
      // memeberApi's methods will trigger only the data of memeberApi.
      // Therefore the data of trainees will not refetch so, we need to trigger it manually.
    });
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
