/* eslint-disable camelcase */
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { leadsApi } from "../../../redux/api/hooksAPI";
import { LeadsTableAPI } from "../../../redux/api/interfaceAPI";

import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import LeadsForm from "./LeadForm";

function LeadEditForm() {
  const id = Number(useParams().id);

  const [updateItem] = leadsApi.useUpdateItemMutation();
  const { data, isFetching, isError, isLoading } = leadsApi.useGetItemByIDQuery(
    { id, userID: useGetUserLoginData().user_id }
  );

  const handleSubmit = ({ city_name, ...body }: LeadsTableAPI) =>
    updateFunction({
      updateItem,
      id,
    })(body);

  return (
    <LoadingSpinner
      nameData="Lead"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {({ lead_id, city_name, ...data }) => (
        <LeadsForm
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={data}
        />
      )}
    </LoadingSpinner>
  );
}

export default LeadEditForm;
