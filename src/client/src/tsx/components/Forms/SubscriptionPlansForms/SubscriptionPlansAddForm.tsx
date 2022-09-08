import React from "react";
import { subscriptionPlansApi } from "../../../redux/api/hooksAPI";
import { SubscriptionPlans } from "../../../redux/api/interfaceAPI";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import MembersPlansForm from "./SubscriptionPlansForm";

function MembersPlansAddForm({
  subscriptionPlansID,
}: {
  subscriptionPlansID: number;
}) {
  const [addItem] = subscriptionPlansApi.useCreateOneItemMutation();
  const handleSubmit = ({ ...rest }: SubscriptionPlans) => {
    addFunction<SubscriptionPlans>({ addItem })({
      ...rest,
      subscription_plan_id: subscriptionPlansID,
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

export default MembersPlansAddForm;
