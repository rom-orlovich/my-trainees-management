import React from "react";
import { citiesApi } from "../../../redux/api/hooksAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { CityForm } from "./CityForm";

export function CityAddForm() {
  const [addItem, state] = citiesApi.useCreateOneItemMutation();

  const handleSubmit = addFunction({
    addItem,
  });

  return <CityForm onSubmit={handleSubmit}></CityForm>;
}
