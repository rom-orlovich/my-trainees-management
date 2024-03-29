import { yupResolver } from "@hookform/resolvers/yup";

import React from "react";
import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { traineesApi } from "../../../redux/api/hooksAPI";
import {
  ParticipantsGroupTableAPI,
  TraineesTableExtendsAPI,
} from "../../../redux/api/interfaceAPI";

import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";

import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { participantsGroupSchema } from "../../baseComponents/RHF-Components/formsSchemas";

import style from "./ParticipantsGroupForm.module.scss";

export function ParticipantsGroupForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<ParticipantsGroupTableAPI>) {
  const authState = useGetUserLoginData();
  const queriesOptions = { trainerUserID: authState.user_id };
  const participantsGroupsListId = Number(useParams().participantGroupListID);

  return (
    <Form<ParticipantsGroupTableAPI>
      nameForm="Participant"
      onSubmit={onSubmit}
      modelMode
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
              transformValue(keyValue) {
                return [Number(keyValue[0]), keyValue[1]];
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
