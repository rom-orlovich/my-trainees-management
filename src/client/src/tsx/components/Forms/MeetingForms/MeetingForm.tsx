/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounceHook } from "../../../hooks/useDebounceHook";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import {
  activitiesApi,
  locationsApi,
  traineesApi,
} from "../../../redux/api/hooksAPI";
import {
  ActivitiesTableAPI,
  LocationsGetRes,
  MeetingAPI,
} from "../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import { formatDate } from "../../../utilities/helpersFun";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";

import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { meetingsSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import TagsInput, {
  Tag,
} from "../../baseComponents/RHF-Components/TagsInput/TagsInput";

export function MeetingForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<MeetingAPI>) {
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  const [queryParams] = useSearchParams();

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

  const [inputValue, setInputValue] = useState("");

  const debounce = useDebounceHook(inputValue, 500);

  const suggestions: Tag[] | undefined = traineesApi?.endpoints?.getItems
    .useQuery({
      mainName: debounce,
      ...queriesOptions,
    })
    ?.currentData?.data.map((el) => ({
      id: String(el.trainee_id),
      text: `${el.first_name} ${el.last_name}`,
    }));

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
            participants_group: [],
            ...defaultValues,
            date_start: DateStart as any,
            date_end: DateEnd as any,
            user_id: authState.user_id,
          },
          resolver: yupResolver(meetingsSchema),
        }}
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
              <TagsInput
                defaultTags={defaultValues?.participants_group.map((el) => ({
                  id: String(el.trainee_id),
                  text: `${el.first_name} ${el.last_name}`,
                }))}
                setTagResult={setValue}
                suggestions={suggestions || []}
                setInputValue={setInputValue}
              />
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
