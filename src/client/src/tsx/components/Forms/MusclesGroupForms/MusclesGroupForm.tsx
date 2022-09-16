import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";
import { MusclesGroupTable } from "../../../redux/api/interfaceAPI";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import { musclesGroupSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import style from "./MusclesGroupForm.module.scss";
import { APP_ROUTE } from "../../../routes/routesConstants";

export function MusclesGroupForm({
  editMode,
  onSubmit,
  defaultValues,
}: GeneralFormProps<MusclesGroupTable>) {
  return (
    <>
      <Form<MusclesGroupTable>
        onSubmit={onSubmit}
        editMode={editMode}
        // pathMove={`/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}`}
        nameForm="Muscles Group"
        formProps={{ className: style.form_musclesGroup }}
        formOptions={{
          mode: "onChange",
          defaultValues: defaultValues,
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
