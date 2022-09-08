import React from "react";
import { subscriptionPlansApi } from "../../../redux/api/hooksAPI";

import { formatDate } from "../../../utlities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import MembersPlansForm from "./SubscriptionPlansForm";

function MembersPlansEditForm({ id }: { id: number }) {
  const { data, isError, isFetching, isLoading } =
    subscriptionPlansApi.useGetItemByIDQuery(id);
  const [updateItem] = subscriptionPlansApi.useUpdateItemMutation();
  const handleSubmit = updateFunction({ id, updateItem });

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

export default MembersPlansEditForm;
