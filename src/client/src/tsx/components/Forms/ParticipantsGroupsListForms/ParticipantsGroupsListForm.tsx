/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { ParticipantsGroupsListTableAPI } from "../../../redux/api/interfaceAPI";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Checkbox from "../../baseComponents/RHF-Components/Checkbox";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { participantsGroupListSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

export function ParticipantsGroupsListForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<ParticipantsGroupsListTableAPI>) {
  return (
    <>
      <Form<ParticipantsGroupsListTableAPI>
        buttonNext={!editMode}
        nameForm={"Participants Group"}
        // heading={`Training Program ${!editMode ? "Building" : "Edit"}`}
        onSubmit={onSubmit}
        editMode={editMode}
        formOptions={{
          defaultValues,
          resolver: yupResolver(participantsGroupListSchema),
        }}
      >
        {({ register, formState }) => {
          const { errors } = formState;

          return (
            <>
              <InputLabel
                InputProps={{ ...register("group_name") }}
                LabelProps={{
                  htmlFor: "group_name",
                  labelText: "Group Name",
                }}
              >
                <InputErrorMessage
                  nameInput="Group Name"
                  error={errors.group_name}
                />
              </InputLabel>

              <Checkbox
                LabelProps={{ labelText: "Public?" }}
                InputProps={{ ...register("public") }}
              >
                <InputErrorMessage nameInput="public" error={errors.public} />
              </Checkbox>
            </>
          );
        }}
      </Form>
    </>
  );
}
