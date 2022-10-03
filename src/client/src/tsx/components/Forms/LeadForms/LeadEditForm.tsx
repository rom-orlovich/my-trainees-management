import React from "react";
import { useLocation, useParams } from "react-router-dom";

import { leadsApi } from "../../../redux/api/hooksAPI";
import { LeadsTableAPI } from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import LeadsForm from "./LeadForm";

function LeadEditForm() {
  const id = Number(useParams().id);

  const [updateItem] = leadsApi.useUpdateItemMutation();
  const { data, isFetching, isError, isLoading } =
    leadsApi.useGetItemByIDQuery(id);

  const handleSubmit = (body: LeadsTableAPI) =>
    updateFunction({
      updateItem,
      id,
    })(body);

  return (
    <LoadingSpinner
      nameData="Lead"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {({ lead_id, ...data }) => (
        <LeadsForm
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={{
            ...data,
            date_lead: formatDate(data.date_lead) as any,
          }}
        />
      )}
    </LoadingSpinner>
  );
}

export default LeadEditForm;
