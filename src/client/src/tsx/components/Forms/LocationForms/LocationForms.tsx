import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import useGetUserID from "../../../hooks/useGetUserID";
import { citiesApi } from "../../../redux/api/hooksAPI";
import {
  CitiesTableAPI,
  LocationsTableAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppSelector } from "../../../redux/hooks";
import { getAuthState } from "../../../redux/slices/authSlice";
import { APP_ROUTE } from "../../../routes/routesConstants";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";

import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { locationsSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import style from "./LocationForms.module.scss";
export function LocationForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<LocationsTableAPI>) {
  return (
    <Form<LocationsTableAPI>
      nameForm="Location"
      onSubmit={onSubmit}
      formProps={{ className: style.form_locations }}
      editMode={editMode}
      formOptions={{
        mode: "onChange",
        defaultValues: { user_id: useGetUserID().user_id, ...defaultValues },
        resolver: yupResolver(locationsSchema),
      }}
    >
      {({ register, formState, control }) => {
        const { street } = formState.errors;

        return (
          <>
            <InputLabel
              InputProps={{ ...register("street") }}
              LabelProps={{
                htmlFor: "street",
                labelText: "Street's Address",
              }}
            >
              <InputErrorMessage nameInput="Street's address" error={street} />
            </InputLabel>

            <AutocompleteInputRHF<LocationsTableAPI, CitiesTableAPI>
              name="city_id"
              control={control}
              AutocompleteInputProps={{
                defaultValueID: defaultValues?.city_id,
                InputLabelProps: {
                  LabelProps: { labelText: "City Name" },

                  InputProps: { placeholder: "Search City" },
                },
                addOption: {
                  link: `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.CITY_ROUTE}/${APP_ROUTE.CITY_ROUTE_ADD}`,
                },
                loadingSpinnerResult: { nameData: "City" },
                useGetData: citiesApi.useGetItemsQuery,
                id: "city_id",
                keys: ["city_name"],
              }}
            />
          </>
        );
      }}
    </Form>
  );
}
