/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { ParticipantsGroupsListTableAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { closeModel } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import ModelFormContainer from "../../baseComponents/Model/ModelFormContainer";
import Checkbox from "../../baseComponents/RHF-Components/CheckBoxGroup/Checkbox";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { participantsGroupListSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { ParticipantsGroupsListAddForm } from "./ParticipantsGroupsListAddForm";
import { ParticipantsGroupsListEditForm } from "./ParticipantsGroupsListEditForm.tsx";

export function ParticipantsGroupsListForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<ParticipantsGroupsListTableAPI>) {
  const dispatch = useAppDispatch();
  return (
    <>
      <Form<ParticipantsGroupsListTableAPI>
        buttonNext={!editMode}
        modelMode={true}
        nameForm={"Participants Group"}
        onSubmit={onSubmit}
        saveState={false}
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
                LabelProps={{ labelText: "isPrivate?" }}
                InputProps={{ ...register("is_private") }}
              />

              {editMode && (
                <Link
                  onClick={() => {
                    dispatch(closeModel());
                  }}
                  style={{ textDecoration: "none" }}
                  to={`/${APP_ROUTE.MISC_ROUTE}/${APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}/${defaultValues?.participants_groups_list_id}/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}`}
                >
                  Edit Participants Group
                </Link>
              )}
            </>
          );
        }}
      </Form>
    </>
  );
}
export const ModelParticipantsGroupListFormContent = () => (
  <ModelFormContainer
    AddForm={ParticipantsGroupsListAddForm}
    EditForm={ParticipantsGroupsListEditForm}
  />
);
