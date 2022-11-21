import React from "react";

import { citiesApi } from "../../../redux/api/hooksAPI";
import { CitiesTableAPI } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { CityForm } from "./CityForm";

export function CityEditForm({ id }: { id: number }) {
  const [updateItem, state] = citiesApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    citiesApi.useGetItemByIDQuery({ id });

  const handleSubmit = (body: CitiesTableAPI) =>
    updateFunction({
      updateItem,
      id,
    })(body);

  return (
    <LoadingSpinner
      nameData="City"
      stateData={{ data, isLoading, isFetching, isError }}
    >
      <CityForm editMode={true} onSubmit={handleSubmit} defaultValues={data} />
    </LoadingSpinner>
  );
}
