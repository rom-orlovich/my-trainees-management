import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { citiesApi } from "../../../redux/api/hooksAPI";
import {
  CitiesTableAPI,
  LocationsTableAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { openModel } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

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
  const dispatch = useAppDispatch();
  return (
    <Form<LocationsTableAPI>
      nameForm="Location"
      modelMode={true}
      onSubmit={onSubmit}
      formProps={{ className: style.form_locations }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          user_id: useGetUserLoginData().user_id,
          ...defaultValues,
        },
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
                  onClick() {
                    dispatch(
                      openModel({
                        displayContent: "cityForm",
                      })
                    );
                  },
                },
                editOption: {
                  onClick(id) {
                    dispatch(
                      openModel({
                        displayContent: "cityForm",
                        curParam: id,
                      })
                    );
                  },
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
