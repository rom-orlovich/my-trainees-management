/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { leadsApi, measuresApi } from "../../../redux/api/hooksAPI";
import {
  LeadsTableAPI,
  MeasuresAPI,
  MeasuresCalResAPI,
} from "../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MeasureAddForm } from "./MeasureAddForm";
import MeasureForm from "./MeasureForms";

function MeasureEditForm() {
  Navigate;
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

  return (
    <LoadingSpinner
      path={`/${APP_ROUTE.MEASURES_ROUTE}/${APP_ROUTE.MEASURE_ADD}`}
      nameData="Measures"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {(data) => {
        console.log(data);
        const results = data.data;

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
        const handleSubmit = ({ ...body }: MeasuresAPI) =>
          updateFunction({
            updateItem,
            id: rest.measure_id,
          })(body);
        // console.log(rest.weight);
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
  );
  // : (
  //   <MeasureAddForm />
  // );
}

export default MeasureEditForm;
