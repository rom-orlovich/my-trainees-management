import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";
import { MusculesGroupTable } from "../../../redux/api/interfaceAPI";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import { musclesGroupSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import style from "./MusculeGroupForm.module.scss";

export function MusculeGroupForm({
  editMode,
  onSubmit,
  defaultValues,
}: GeneralFormProps<MusculesGroupTable>) {
  return (
    <>
      <Form<MusculesGroupTable>
        onSubmit={onSubmit}
        editMode={editMode}
        nameForm="Muscule Group"
        formProps={{ className: style.form_musculesGroup }}
        formOptions={{
          mode: "onChange",
          defaultValues: defaultValues,
          resolver: yupResolver(musclesGroupSchema),
        }}
      >
        {({ register, formState, reset }) => {
          const { muscules_group_name } = formState.errors;

          return (
            <>
              <InputLabel
                InputProps={{
                  ...register("muscules_group_name"),
                  // isError: !!muscules_group_name,
                }}
                LabelProps={{
                  htmlFor: "muscules_group_name",
                  labelText: "Muscules Group",
                }}
              >
                <InputErrorMessage
                  nameInput="Muscules group's name"
                  error={muscules_group_name}
                />
              </InputLabel>
            </>
          );
        }}
      </Form>
    </>
  );
}
