import React from "react";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { citiesApi } from "../../../redux/api/hooksAPI";
import { CitiesTableAPI } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { useUpdateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { CityForm } from "./CityForm";

export type SubmitHandlerFun<T extends FieldValues> = (body: T) => Promise<
  | {
      data: unknown;
    }
  | {
      error: unknown;
    }
>;
export function CityEditForm() {
  const id = Number(useParams().id);
  const [updateItem, state] = citiesApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    citiesApi.useGetItemByIDQuery(id);
  const updateFunction = useUpdateFunction();

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
      <CityForm
        editMode={true}
        onSubmit={handleSubmit}
        defaultValues={data}
      ></CityForm>
    </LoadingSpinner>
  );
}
