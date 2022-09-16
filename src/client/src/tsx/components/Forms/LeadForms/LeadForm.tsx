import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  FormWithNotesProps,
  GeneralFormProps,
} from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { leadsSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { LeadsTable } from "../../../redux/api/interfaceAPI";

import Checkbox from "../../baseComponents/RHF-Components/Checkbox";
import { formatDate } from "../../../utilities/helpersFun";
import { APP_ROUTE } from "../../../routes/routesConstants";
export type LeadsFormProps = LeadsTable;
export function LeadForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<LeadsTable>) {
  return (
    <Form<LeadsTable>
      editMode={editMode}
      onSubmit={onSubmit}
      nameForm="Lead"
      pathMove={`/${APP_ROUTE.LEADS_ROUTE}`}
      formOptions={{
        mode: "onChange",
        defaultValues: defaultValues,
        resolver: yupResolver(leadsSchema),
      }}
    >
      {({ register, formState }) => {
        const {
          date_lead,
          first_name,
          last_name,
          email,
          phone_number,
          status,
          note_text,
          name_topic,
        } = formState.errors;
        return (
          <>
            <InputLabel
              InputProps={{
                ...register("date_lead"),
                type: "date",
                defaultValue: formatDate(new Date()) as any,
              }}
              LabelProps={{
                htmlFor: "date_lead",
                labelText: "Date",
              }}
            >
              <InputErrorMessage nameInput="Date" error={date_lead} />
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
              InputProps={{ ...register("name_topic") }}
              LabelProps={{
                htmlFor: "name_topic",
                labelText: "Topic",
              }}
            >
              <InputErrorMessage nameInput="Topic" error={name_topic} />
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
