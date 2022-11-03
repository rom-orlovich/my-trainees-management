/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
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
        pathMove={""}
        editMode={editMode}
        formOptions={{
          defaultValues: {
            ...defaultValues,
            user_id: useGetUserLoginData().user_id,
          },
          resolver: yupResolver(participantsGroupListSchema),
        }}
      >
        {({ register, formState, getValues }) => {
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
                InputProps={{ ...register("is_private") }}
              >
                <InputErrorMessage
                  nameInput="is_private"
                  error={errors.is_private}
                />
              </Checkbox>
            </>
          );
        }}
      </Form>
    </>
  );
}
