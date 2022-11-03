import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { citiesApi, traineesApi } from "../../../redux/api/hooksAPI";
import {
  CitiesTableAPI,
  LocationsTableAPI,
  ParticipantsGroupTableAPI,
  TraineesTableExtendsAPI,
} from "../../../redux/api/interfaceAPI";

import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";

import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import {
  locationsSchema,
  participantsGroupSchema,
} from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import style from "./ParticipantsGroupForm.module.scss";

export function ParticipantsGroupForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<ParticipantsGroupTableAPI>) {
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  return (
    <Form<ParticipantsGroupTableAPI>
      nameForm="Participant"
      onSubmit={onSubmit}
      formProps={{ className: style.form_locations }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          user_id: useGetUserLoginData().user_id,
          ...defaultValues,
        },
        resolver: yupResolver(participantsGroupSchema),
      }}
    >
      {({ control }) => (
        <>
          <AutocompleteInputRHF<
            ParticipantsGroupTableAPI,
            TraineesTableExtendsAPI
          >
            name="trainee_id"
            control={control}
            AutocompleteInputProps={{
              queriesOptions,
              defaultValueID: defaultValues?.trainee_id,
              InputLabelProps: {
                LabelProps: { labelText: "Trainee" },
                InputProps: { placeholder: "Search Trainee" },
              },
              addOption: {
                link: `/${APP_ROUTE.TRAINEES_ROUTE}/${APP_ROUTE.TRAINEES_ROUTE_ADD}`,
              },
              loadingSpinnerResult: { nameData: "Trainees" },
              useGetData: traineesApi.useGetItemsQuery,
              id: "trainee_id",
              keys: ["first_name", "last_name"],
            }}
          />
        </>
      )}
    </Form>
  );
}
