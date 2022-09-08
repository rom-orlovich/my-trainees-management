import React from "react";
import { useParams } from "react-router-dom";
import { locationsApi } from "../../../redux/api/hooksAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { LocationForm } from "./LocationForms";

export function LocationEditForm() {
  const id = Number(useParams().id);
  const [updateItem, state] = locationsApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    locationsApi.useGetItemByIDQuery(id);
  const handleSubmit = updateFunction({
    updateItem,
    id,
  });

  return (
    <LoadingSpinner
      nameData="Location"
      stateData={{ data, isLoading, isFetching, isError }}
    >
      {({ city_name, ...rest }) => (
        <LocationForm
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={rest}
        ></LocationForm>
      )}
    </LoadingSpinner>
  );
}
