import React from "react";
import { useParams } from "react-router-dom";
import { equipmentsApi } from "../../../redux/api/hooksAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { EquipmentForm } from "./EquipmentForm";

export function EquipmentEditForm() {
  const id = Number(useParams().id);
  const [updateItem, state] = equipmentsApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    equipmentsApi.useGetItemByIDQuery(id);
  const handleSubmit = updateFunction({
    updateItem,
    id,
  });

  return (
    <LoadingSpinner
      nameData="Equipment"
      stateData={{ data, isLoading, isFetching, isError }}
    >
      <EquipmentForm
        editMode={true}
        onSubmit={handleSubmit}
        defaultValues={data}
      ></EquipmentForm>
    </LoadingSpinner>
  );
}
