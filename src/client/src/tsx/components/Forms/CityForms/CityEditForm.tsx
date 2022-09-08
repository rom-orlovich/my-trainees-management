import React from "react";
import { useParams } from "react-router-dom";
import { citiesApi } from "../../../redux/api/hooksAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { CityForm } from "./CityForm";

export function CityEditForm() {
  const id = Number(useParams().id);
  const [updateItem, state] = citiesApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    citiesApi.useGetItemByIDQuery(id);
  const handleSubmit = updateFunction({
    updateItem,
    id,
  });

  return (
    <LoadingSpinner
      nameData="City"
      stateData={{ data, isLoading, isFetching, isError }}
    >
      <CityForm
        editMode={true}
        onSubmit={handleSubmit}
        defaultValues={data}
      ></CityForm>
    </LoadingSpinner>
  );
}
