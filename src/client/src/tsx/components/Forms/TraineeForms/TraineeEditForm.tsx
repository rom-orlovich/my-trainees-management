import React from "react";
import { traineesApi } from "../../../redux/api/hooksAPI";

import {
  TraineesTableExtendsAPI,
  TraineesBaseTableAPI,
} from "../../../redux/api/interfaceAPI";
import { getAuthState } from "../../../redux/slices/authSlice";

import { formatDate } from "../../../utilities/helpersFun";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm from "./TraineeForm";
export function TraineeEditForm({
  traineeData: { street, city_name, ...traineeData },
  heading,
}: {
  heading?: string;
  traineeData: TraineesTableExtendsAPI;
}) {
  const [updateTrainee] = traineesApi.useUpdateItemMutation();

  const handleSubmit = ({
    profile_id,
    trainee_id,
    ...rest
  }: TraineesBaseTableAPI) => {
    updateFunction({
      id: traineeData?.trainee_id || 0,
      updateItem: updateTrainee,
    })(rest);
  };

  return (
    <TraineeForm
      // formWithOneButton={true}
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
