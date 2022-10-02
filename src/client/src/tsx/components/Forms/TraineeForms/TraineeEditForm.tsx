import React from "react";
import { traineesApi } from "../../../redux/api/hooksAPI";

import {
  TraineesTableExtendsAPI,
  TraineesBaseTableAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";

import { formatDate } from "../../../utilities/helpersFun";
import { useUpdateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm from "./TraineeForm";
import { resetGoPrevPageState } from "../../../redux/slices/apiSideEffectSlice";
export function TraineeEditForm({
  traineeData,
  heading,
}: {
  heading?: string;
  traineeData: TraineesBaseTableAPI;
}) {
  const [updateTrainee] = traineesApi.useUpdateItemMutation();

  const updateFunction = useUpdateFunction();

  const handleSubmit = (body: TraineesBaseTableAPI) => {
    const { profile_id, trainee_id, ...rest } = body as TraineesBaseTableAPI;

    updateFunction({
      id: traineeData?.trainee_id || 0,
      updateItem: updateTrainee,
    })(rest);
  };

  return (
    <TraineeForm
      // changeButtonContainer={true}
      editMode={true}
      heading={heading}
      onSubmit={handleSubmit}
      defaultValues={{
        ...traineeData,
        date_join: formatDate(traineeData.date_join) as any,
        birthday: formatDate(traineeData.birthday) as any,
      }}
    ></TraineeForm>
  );
}

export default TraineeEditForm;
