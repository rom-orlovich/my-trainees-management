import React from "react";
import { traineesApi } from "../../../redux/api/hooksAPI";

import {
  TraineeTableAPI,
  TraineesTableAPI,
} from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm from "./TraineeForm";

export function TraineeEditForm({
  traineeData,
  heading,
}: {
  heading?: string;
  traineeData: TraineesTableAPI;
}) {
  const [updateTrainee] = traineesApi.useUpdateItemMutation();

  const handleSubmit = (body: TraineesTableAPI) => {
    const {
      profile_id,
      street,
      training_programs_list_id,
      nutrition_programs_list_id,
      city_name,
      subscription_plan_id,
      ...rest
    } = body as TraineeTableAPI;

    updateFunction({
      id: traineeData?.profile_id || 0,
      updateItem: updateTrainee,
    })(rest);
  };

  return (
    <TraineeForm
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
