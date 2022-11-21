import React from "react";
import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { locationsApi } from "../../../redux/api/hooksAPI";
import { LocationsTableAPI } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { LocationForm } from "./LocationForms";

export function LocationEditForm({ id }: { id: number }) {
  // const id = Number(useParams().id);

  const [updateItem, state] = locationsApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    locationsApi.useGetItemByIDQuery({
      id,
      userID: useGetUserLoginData().user_id,
    });

  const handleSubmit = (body: LocationsTableAPI) =>
    updateFunction({
      updateItem,
      id,
    })(body);

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
        />
      )}
    </LoadingSpinner>
  );
}
