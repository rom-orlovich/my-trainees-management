import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useParams } from "react-router-dom";
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
  const participantsGroupsListId = Number(useParams().id);
  return (
    <Form<ParticipantsGroupTableAPI>
      nameForm="Participant"
      onSubmit={onSubmit}
      formProps={{ className: style.participants_group_form }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          participants_groups_list_id: participantsGroupsListId,
          ...defaultValues,
          user_id: useGetUserLoginData().user_id,
        },
        resolver: yupResolver(participantsGroupSchema),
      }}
    >
      {({ control, formState }) => {
        console.log(formState.errors);
        return (
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
        );
      }}
    </Form>
  );
}
