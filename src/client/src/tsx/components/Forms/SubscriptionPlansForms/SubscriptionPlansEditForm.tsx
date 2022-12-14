/* eslint-disable camelcase */
import React from "react";
import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { subscriptionPlansApi } from "../../../redux/api/hooksAPI";
import { SubscriptionPlansAPI } from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import SubscriptionPlansForm from "./SubscriptionPlansForm";

function SubscriptionPlansEditForm({ id }: { id: number }) {
  const { data, isError, isFetching, isLoading } =
    subscriptionPlansApi.useGetItemByIDQuery({
      id,
      trainerUserID: useGetUserLoginData().user_id,
    });
  const [updateItem] = subscriptionPlansApi.useUpdateItemMutation();

  const handleSubmit = ({ product_name, ...rest }: SubscriptionPlansAPI) =>
    updateFunction({
      updateItem,
      id,
    })(rest);

  return (
    <LoadingSpinner
      nameData="Subscription Plans"
      stateData={{ data, isError, isFetching, isLoading }}
    >
      {(data) => (
        <SubscriptionPlansForm
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
