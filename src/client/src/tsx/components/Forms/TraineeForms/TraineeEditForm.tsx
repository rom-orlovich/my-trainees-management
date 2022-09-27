import React from "react";
import { traineesApi } from "../../../redux/api/hooksAPI";

import {
  TraineeTableAPI,
  TraineesTableAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";

import { formatDate } from "../../../utilities/helpersFun";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm from "./TraineeForm";
import { resetGoPrevPageState } from "../../../redux/slices/apiSideEffectSlice";
export function TraineeEditForm({
  traineeData,
  heading,
}: {
  heading?: string;
  traineeData: TraineesTableAPI;
}) {
  const [updateTrainee] = traineesApi.useUpdateItemMutation();
  // const dispatch = useAppDispatch();
  // dispatch(resetGoPrevPageState());
  const handleSubmit = (body: TraineesTableAPI) => {
    const {
      profile_id,
      street,

      city_name,

      ...rest
    } = body as TraineeTableAPI;

    updateFunction({
      id: traineeData?.profile_id || 0,
      updateItem: updateTrainee,
    })(rest);
  };

  return (
    <TraineeForm
      // savedChangedButton={true}
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
