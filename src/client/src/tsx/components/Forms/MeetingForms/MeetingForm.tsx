/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { getValue } from "@testing-library/user-event/dist/types/utils";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSearchParams } from "react-router-dom";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import {
  activitiesApi,
  locationsApi,
  participantsGroupsListApi,
} from "../../../redux/api/hooksAPI";
import {
  ActivitiesTableAPI,
  LocationsGetRes,
  MeetingAPI,
  ParticipantsGroupsListTableAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { openModel } from "../../../redux/slices/modelControllerSlice";

import {
  formatDate,
  newDate,
  setInputLocalDate,
} from "../../../utilities/helpersFun";

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
  const dispatch = useAppDispatch();
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  const [queryParams, setQueryParams] = useSearchParams();

  const dateStart = Number(queryParams.get("dateStart"));
  const dateEnd = Number(queryParams.get("dateEnd"));

  const DateStart = setInputLocalDate(
    newDate(defaultValues?.date_start || dateStart)
  );

  const DateEnd = setInputLocalDate(
    newDate(defaultValues?.date_end || dateEnd)
  );

  return (
    <>
      <Form<MeetingAPI>
        nameForm="Meeting"
        onSubmit={onSubmit}
        editMode={editMode}
        customButtonText={"Submit"}
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
      >
        {({ register, formState, control, watch, setValue }) => {
          const { errors, touchedFields } = formState;

          const date_start = watch("date_start");

          useEffect(() => {
            // The purpose of this check is for the user will be able to change the date_end of the meeting.
            if (
              (!defaultValues?.date_end && date_start) ||
              (touchedFields.date_start && defaultValues?.date_end)
            ) {
              const curStartDate = new Date(date_start);

              setValue(
                "date_end",
                setInputLocalDate(newDate(curStartDate, { minPlus: 45 })) as any
              );
            }
          }, [date_start, touchedFields.date_start]);

          return (
            <>
              <div className="dates_meeting_model_form_container">
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

              <div className="participants_groups_meeting_model_form_container">
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
                      onClick() {
                        dispatch(
                          openModel({
                            displayContent: "participantsGroupsListForm",
                          })
                        );
                      },
                    },
                    loadingSpinnerResult: { nameData: "Search Groups" },
                    useGetData: participantsGroupsListApi.useGetItemsQuery,
                    id: "participants_groups_list_id",
                    keys: ["group_name"],
                    editOption: {
                      link: "",
                      onClick(id) {
                        dispatch(
                          openModel({
                            displayContent: "participantsGroupsListForm",
                            curParam: id,
                          })
                        );
                      },
                    },
                  }}
                />
              </div>
              <div className="autocomplete_meeting_model_form_container">
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
                      onClick() {
                        dispatch(
                          openModel({
                            displayContent: "activityForm",
                          })
                        );
                      },
                    },
                    editOption: {
                      onClick(id) {
                        dispatch(
                          openModel({
                            displayContent: "activityForm",
                            curParam: id,
                          })
                        );
                      },
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
                      onClick() {
                        dispatch(
                          openModel({
                            displayContent: "locationForm",
                          })
                        );
                      },
                    },
                    editOption: {
                      onClick(id) {
                        dispatch(
                          openModel({
                            displayContent: "locationForm",
                            curParam: id,
                          })
                        );
                      },
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
