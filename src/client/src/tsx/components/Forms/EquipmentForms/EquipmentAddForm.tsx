import React from "react";
import { equipmentsApi } from "../../../redux/api/hooksAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { EquipmentForm } from "./EquipmentForm";

export function EquipmentAddForm() {
  const [addItem, state] = equipmentsApi.useCreateOneItemMutation();

  const handleSubmit = addFunction({
    addItem,
  });

  return <EquipmentForm onSubmit={handleSubmit}></EquipmentForm>;
}
