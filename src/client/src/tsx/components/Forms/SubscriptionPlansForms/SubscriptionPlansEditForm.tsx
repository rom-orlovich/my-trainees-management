import React from "react";
import { subscriptionPlansApi } from "../../../redux/api/hooksAPI";
import { SubscriptionPlansAPI } from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import MembersPlansForm from "./SubscriptionPlansForm";

function SubscriptionPlansEditForm({ id }: { id: number }) {
  const { data, isError, isFetching, isLoading } =
    subscriptionPlansApi.useGetItemByIDQuery({ id });
  const [updateItem] = subscriptionPlansApi.useUpdateItemMutation();

  const handleSubmit = (body: SubscriptionPlansAPI) =>
    updateFunction({
      updateItem,
      id,
    })(body);

  return (
    <LoadingSpinner
      nameData="Member Plan"
      stateData={{ data, isError, isFetching, isLoading }}
    >
      {data && (
        <MembersPlansForm
          onSubmit={handleSubmit}
          defaultValues={{
            ...data,
            last_training: formatDate(data?.last_training) as any,
          }}
          editMode={true}
        />
      )}
    </LoadingSpinner>
  );
}

export default SubscriptionPlansEditForm;
