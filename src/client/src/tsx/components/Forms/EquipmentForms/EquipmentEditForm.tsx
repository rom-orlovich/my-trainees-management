import React from "react";
import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { equipmentsApi } from "../../../redux/api/hooksAPI";
import { EquipmentsTableAPI } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { EquipmentForm } from "./EquipmentForm";

export function EquipmentEditForm({ id }: { id: number }) {
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  const [updateItem, state] = equipmentsApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    equipmentsApi.useGetItemByIDQuery({ id, ...queriesOptions });

  const handleSubmit = (body: EquipmentsTableAPI) =>
    updateFunction({
      updateItem,
      id,
    })(body);

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
