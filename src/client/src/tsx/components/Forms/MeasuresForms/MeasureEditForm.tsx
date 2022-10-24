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
    { username, trainerUserID: useGetUserLoginData().user_id }
    // {
    //   selectFromResult: ({ data, ...state }) => {
    //     const results = data?.data;

    //     return {
    //       data: results
    //         ? data?.data[results.length - 1]
    //         : ({} as MeasuresCalResAPI),
    //       ...state,
    //     };
    //   },
    // }
  );
  console.log(data);
  return data?.data.length ? (
    <LoadingSpinner
      nameData="Measures"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {(data) => {
        const results = data.data;
        console.log(data.data);
        const {
          protein_g,
          calories_total,
          crabs_cals,
          fat_g,
          crabs_g,
          protein_cals,
          fat_cals,
          fixed_cals,
          ...rest
        } = data.data[results.length - 1];
        const handleSubmit = ({ ...body }: MeasuresAPI) => {
          console.log(body);
          return updateFunction({
            updateItem,
            id: rest.measure_id,
          })(body);
        };
        return (
          <MeasureForm
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={{
              ...rest,
              date: formatDate(rest.date) as any,
            }}
          />
        );
      }}
    </LoadingSpinner>
  ) : (
    <MeasureAddForm />
  );
}

export default MeasureEditForm;
