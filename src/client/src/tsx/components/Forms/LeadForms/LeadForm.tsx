/* eslint-disable camelcase */
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  // FormWithNotesProps,
  GeneralFormProps,
} from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { leadsSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import {
  LeadsTableAPI,
  LocationsGetRes,
} from "../../../redux/api/interfaceAPI";

import Checkbox from "../../baseComponents/RHF-Components/Checkbox";
import { formatDate } from "../../../utilities/helpersFun";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { SelectInput } from "../../baseComponents/RHF-Components/SelectInput/SelectInput";
import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import { locationsApi } from "../../../redux/api/hooksAPI";

const today = new Date();
export function LeadForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<LeadsTableAPI>) {
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  return (
    <Form<LeadsTableAPI>
      editMode={editMode}
      onSubmit={onSubmit}
      nameForm="Lead"
      pathMove={`/${APP_ROUTE.LEADS_ROUTE}`}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          user_id: authState.user_id,
          lead_date: formatDate(defaultValues?.lead_date || today) as any,
          birthday: formatDate(defaultValues?.birthday || today) as any,
        },
        resolver: yupResolver(leadsSchema),
      }}
    >
      {({ register, formState, control }) => {
        const {
          lead_date,
          first_name,
          last_name,
          birthday,

          email,
          phone_number,
          status,
          note_text,
          note_topic,
        } = formState.errors;
        return (
          <>
            <InputLabel
              InputProps={{
                ...register("lead_date"),
                type: "date",
              }}
              LabelProps={{
                htmlFor: "lead_date",
                labelText: "Date",
              }}
            >
              <InputErrorMessage nameInput="Date" error={lead_date} />
            </InputLabel>

            <InputLabel
              InputProps={{ ...register("first_name") }}
              LabelProps={{
                htmlFor: "first_name",
                labelText: "First Name",
              }}
            >
              <InputErrorMessage nameInput="First Name" error={first_name} />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("last_name") }}
              LabelProps={{
                htmlFor: "last_name",
                labelText: "Last Name",
              }}
            >
              <InputErrorMessage nameInput="Last Name" error={last_name} />
            </InputLabel>

            <SelectInput
              selectProps={{ ...register("gender") }}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              LabelProps={{ labelText: "Gender" }}
            />

            <InputLabel
              InputProps={{ ...register("birthday"), type: "date" }}
              LabelProps={{
                htmlFor: "birthday",
                labelText: "Birthday",
              }}
            >
              <InputErrorMessage nameInput="Birthday" error={birthday} />
            </InputLabel>

            <AutocompleteInputRHF<LeadsTableAPI, LocationsGetRes>
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

            <InputLabel
              InputProps={{ ...register("phone_number") }}
              LabelProps={{
                htmlFor: "phone_number",
                labelText: "Phone Number",
              }}
            >
              <InputErrorMessage
                nameInput="Phone Number"
                error={phone_number}
              />
            </InputLabel>
            <InputLabel
              InputProps={{ ...register("email") }}
              LabelProps={{
                htmlFor: "email",
                labelText: "Email",
              }}
            >
              <InputErrorMessage nameInput="Email" error={email} />
            </InputLabel>

            <Checkbox
              LabelProps={{ labelText: "status" }}
              InputProps={{ ...register("status") }}
            >
              <InputErrorMessage nameInput="status" error={status} />
            </Checkbox>
            <InputLabel
              InputProps={{ ...register("note_topic") }}
              LabelProps={{
                htmlFor: "note_topic",
                labelText: "Topic",
              }}
            >
              <InputErrorMessage nameInput="Topic" error={note_topic} />
            </InputLabel>
            <InputLabel
              TextAreaProps={{ ...register("note_text") }}
              LabelProps={{
                htmlFor: "note_text",
                labelText: "Text",
              }}
            >
              <InputErrorMessage nameInput="Text" error={note_text} />
            </InputLabel>
          </>
        );
      }}
    </Form>
  );
}

export default LeadForm;
