/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounceHook } from "../../../hooks/useDebounceHook";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import {
  activitiesApi,
  locationsApi,
  meetingApi,
  participantsGroupApi,
  participantsGroupsListApi,
  traineesApi,
} from "../../../redux/api/hooksAPI";
import {
  ActivitiesTableAPI,
  API_ROUTES,
  LocationsGetRes,
  MeetingAPI,
  ParticipantsGroupsListTableAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import { formatDate } from "../../../utilities/helpersFun";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";

import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { meetingsSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

export function MeetingForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<MeetingAPI>) {
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  const [queryParams, setQueryParams] = useSearchParams();

  const dateStart = Number(queryParams.get("dateStart"));
  const dateEnd = Number(queryParams.get("dateEnd"));

  const DateStart = formatDate(
    defaultValues?.date_start || new Date(dateStart),
    0,
    true
  );
  const DateEnd = formatDate(
    defaultValues?.date_end || new Date(dateEnd),
    0,
    true
  );

  return (
    <>
      <Form<MeetingAPI>
        nameForm="Meeting"
        onSubmit={onSubmit}
        editMode={editMode}
        customButtonText={"submit"}
        saveState={false}
        formWithOneButton={true}
        formOptions={{
          defaultValues: {
            ...defaultValues,
            date_start: DateStart as any,
            date_end: DateEnd as any,
            user_id: authState.user_id,
          },

          resolver: yupResolver(meetingsSchema),
        }}
        // formProps={{ className: "" }}
      >
        {({ register, formState, control, setValue }) => {
          const { errors } = formState;

          return (
            <>
              <div className="dates_form_model_container">
                <InputLabel
                  InputProps={{
                    ...register("date_start"),
                    type: "datetime-local",
                  }}
                  LabelProps={{
                    htmlFor: "date_start",
                    labelText: "Start Meeting",
                  }}
                >
                  <InputErrorMessage
                    nameInput="Start Meeting"
                    error={errors.date_start}
                  />
                </InputLabel>
                <InputLabel
                  InputProps={{
                    ...register("date_end"),
                    type: "datetime-local",
                  }}
                  LabelProps={{
                    htmlFor: "date_end",
                    labelText: "End Meeting",
                  }}
                >
                  <InputErrorMessage
                    nameInput="End Meeting"
                    error={errors.date_end}
                  />
                </InputLabel>
              </div>

              <div className="participants_groups_form_model_container">
                <AutocompleteInputRHF<
                  MeetingAPI,
                  ParticipantsGroupsListTableAPI
                >
                  name="participants_groups_list_id"
                  control={control}
                  AutocompleteInputProps={{
                    queriesOptions: {
                      ...queriesOptions,
                    },
                    defaultValueID: defaultValues?.participants_groups_list_id,
                    InputLabelProps: {
                      LabelProps: { labelText: "Participants Groups" },
                      InputProps: { placeholder: "Search Groups" },
                    },
                    addOption: {
                      link: `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}/${APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE_ADD}`,
                    },
                    loadingSpinnerResult: { nameData: "Search Groups" },
                    useGetData: participantsGroupsListApi.useGetItemsQuery,
                    id: "participants_groups_list_id",
                    keys: ["group_name"],
                    editOption: {
                      link: (id) =>
                        `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}/${id}`,
                    },
                  }}
                />
              </div>
              <div className="autocomplete_form_model_container">
                <AutocompleteInputRHF<MeetingAPI, ActivitiesTableAPI>
                  name="activity_id"
                  control={control}
                  AutocompleteInputProps={{
                    queriesOptions: {
                      ...queriesOptions,
                    },
                    defaultValueID: defaultValues?.activity_id,
                    InputLabelProps: {
                      LabelProps: { labelText: "Activities" },
                      InputProps: { placeholder: "Search Activities" },
                    },
                    addOption: {
                      link: `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.ACTIVITIES_ROUTE}/${APP_ROUTE.ACTIVITIES_ROUTE_ADD}`,
                    },
                    editOption: {
                      link: (id) =>
                        `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.ACTIVITIES_ROUTE}/${id}`,
                    },
                    loadingSpinnerResult: { nameData: "Activity" },
                    useGetData: activitiesApi.useGetItemsQuery,
                    id: "activity_id",
                    keys: ["activity_name"],
                  }}
                />
                <AutocompleteInputRHF<MeetingAPI, LocationsGetRes>
                  name="location_id"
                  control={control}
                  AutocompleteInputProps={{
                    queriesOptions,
                    defaultValueID: defaultValues?.location_id,
                    InputLabelProps: {
                      LabelProps: { labelText: "Locations" },
                      InputProps: { placeholder: "Search Location" },
                    },
                    addOption: {
                      link: `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.LOCATION_ROUTE}/${APP_ROUTE.LOCATION_ROUTE_ADD}`,
                    },
                    editOption: {
                      link: (id) =>
                        `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.LOCATION_ROUTE}/${id}`,
                    },
                    loadingSpinnerResult: { nameData: "Locations" },
                    useGetData: locationsApi.useGetItemsQuery,
                    id: "location_id",
                    keys: ["street", "city_name"],
                  }}
                />
              </div>
              <InputLabel
                className="title"
                InputProps={{ ...register("note_topic") }}
                LabelProps={{
                  htmlFor: "note_topic",
                  labelText: "Title",
                }}
              >
                <InputErrorMessage
                  nameInput="Title"
                  error={errors.note_topic}
                />
              </InputLabel>

              <InputLabel
                TextAreaProps={{ ...register("note_text") }}
                LabelProps={{
                  htmlFor: "note_text",
                  labelText: "Text",
                }}
              >
                <InputErrorMessage nameInput="Text" error={errors.note_text} />
              </InputLabel>
            </>
          );
        }}
      </Form>
    </>
  );
}
