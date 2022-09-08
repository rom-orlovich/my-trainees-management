import React from "react";
import { locationsApi } from "../../../redux/api/hooksAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { LocationForm } from "./LocationForms";

export function LocationAddForm() {
  const [addItem, state] = locationsApi.useCreateOneItemMutation();

  const handleSubmit = addFunction({
    addItem,
  });

  return <LocationForm onSubmit={handleSubmit}></LocationForm>;
}
