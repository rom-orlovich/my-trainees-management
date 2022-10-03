import React from "react";
import { citiesApi } from "../../../redux/api/hooksAPI";
import { CitiesTableAPI } from "../../../redux/api/interfaceAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { CityForm } from "./CityForm";

export function CityAddForm() {
  const [addItem, state] = citiesApi.useCreateOneItemMutation();

  const handleSubmit = (body: CitiesTableAPI) =>
    addFunction({
      addItem,
    })(body);

  return <CityForm onSubmit={handleSubmit}></CityForm>;
}
