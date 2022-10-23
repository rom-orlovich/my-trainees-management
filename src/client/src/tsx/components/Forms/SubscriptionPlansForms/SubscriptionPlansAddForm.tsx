import React from "react";
import { useParams } from "react-router-dom";
import { subscriptionPlansApi } from "../../../redux/api/hooksAPI";
import { SubscriptionPlansAPI } from "../../../redux/api/interfaceAPI";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import MembersPlansForm from "./SubscriptionPlansForm";

function SubscriptionPlansAddForm() {
  const [addItem] = subscriptionPlansApi.useCreateOneItemMutation();
  const traineeID = Number(useParams().id);
  const handleSubmit = ({ ...rest }: SubscriptionPlansAPI) => {
    addFunction<SubscriptionPlansAPI>({ addItem })({
      ...rest,
      trainee_id: traineeID,
    });
  };

  return (
    <MembersPlansForm
      onSubmit={handleSubmit}
      // defaultValues={{
      //   // member_id: memberID,
      //   // current_num_trainings: 0,
      //   // total_trainings: 1,
      //   // last_training: formatDate(new Date()) as any,
      // }}
      editMode={false}
    />
  );
}

export default SubscriptionPlansAddForm;
