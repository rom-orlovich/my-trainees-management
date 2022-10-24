/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { leadsApi, measuresApi } from "../../../redux/api/hooksAPI";
import {
  LeadsTableAPI,
  MeasuresAPI,
  MeasuresCalResAPI,
} from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MeasureAddForm } from "./MeasureAddForm";
import MeasureForm from "./MeasureForms";

function MeasureEditForm() {
  const [updateItem] = measuresApi.useUpdateItemMutation();
  const [queryParams] = useSearchParams();
  const username = queryParams.get("username");
  const { data, isFetching, isError, isLoading } = measuresApi.useGetItemsQuery(
    { username, trainerUserID: useGetUserLoginData().user_id },
    {
      selectFromResult: ({ data, ...state }) => {
        const results = data?.data;

        return {
          data: results
            ? data?.data[results.length - 1]
            : ({} as MeasuresCalResAPI),
          ...state,
        };
      },
    }
  );

  const handleSubmit = ({
    // calories_total,
    // crabs_cals,
    // crabs_g,
    // fat_cals,
    // fat_g,
    // protein_cals,
    // protein_g,
    measure_id,
    ...body
  }: MeasuresAPI) =>
    updateFunction({
      updateItem,
      id: measure_id || 0,
    })(body);

  return data ? (
    <LoadingSpinner
      nameData="Lead"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {({
        calories_total,
        crabs_cals,
        crabs_g,
        fat_cals,
        fat_g,
        protein_cals,
        protein_g,
        measure_id,

        date,
        ...data
      }) => (
        <MeasureForm
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={{
            ...data,
            date: formatDate(date) as any,
          }}
        />
      )}
    </LoadingSpinner>
  ) : (
    <MeasureAddForm />
  );
}

export default MeasureEditForm;
