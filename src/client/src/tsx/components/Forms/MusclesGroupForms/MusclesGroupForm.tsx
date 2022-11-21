import { yupResolver } from "@hookform/resolvers/yup";

import { MusclesGroupTableAPI } from "../../../redux/api/interfaceAPI";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import { musclesGroupSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import Form from "../../baseComponents/RHF-Components/Form/Form";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

export function MusclesGroupForm({
  editMode,
  onSubmit,
  defaultValues,
}: GeneralFormProps<MusclesGroupTableAPI>) {
  return (
    <>
      <Form<MusclesGroupTableAPI>
        onSubmit={onSubmit}
        editMode={editMode}
        modelMode
        nameForm="Muscles Group"
        formOptions={{
          defaultValues: {
            user_id: useGetUserLoginData().user_id,
            ...defaultValues,
          },
          resolver: yupResolver(musclesGroupSchema),
        }}
      >
        {({ register, formState, reset }) => {
          const { muscles_group_name } = formState.errors;

          return (
            <>
              <InputLabel
                InputProps={{
                  ...register("muscles_group_name"),
                  // isError: !!muscles_group_name,
                }}
                LabelProps={{
                  htmlFor: "muscles_group_name",
                  labelText: "Muscles Group",
                }}
              >
                <InputErrorMessage
                  nameInput="Muscles group's name"
                  error={muscles_group_name}
                />
              </InputLabel>
            </>
          );
        }}
      </Form>
    </>
  );
}
