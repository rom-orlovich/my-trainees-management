import React from "react";
import { useParams } from "react-router-dom";
import { subscriptionPlansApi } from "../../../redux/api/hooksAPI";
import { SubscriptionPlansAPI } from "../../../redux/api/interfaceAPI";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import SubscriptionPlansForm from "./SubscriptionPlansForm";

function SubscriptionPlansAddForm() {
  const [addItem] = subscriptionPlansApi.useCreateOneItemMutation();

  const handleSubmit = (body: SubscriptionPlansAPI) =>
    addFunction<SubscriptionPlansAPI>({ addItem })(body);

  return <SubscriptionPlansForm onSubmit={handleSubmit} editMode={false} />;
}

export default SubscriptionPlansAddForm;
