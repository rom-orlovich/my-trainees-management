import { useFieldArray } from "react-hook-form";

import { GeneralFormProps } from "../../../baseComponents/baseComponentsTypes";
import { CheckBox } from "../../../baseComponents/RHF-Components/CheckBoxGroup/Checkbox";
import CheckBoxGroup from "../../../baseComponents/RHF-Components/CheckBoxGroup/CheckboxGroup";
import Form from "../../../baseComponents/RHF-Components/Form/Form";

import style from "./AllergensForm.module.scss";
import { AllergensListType, ALLERGENS_LIST } from "./constants";

export interface AllergensCheckbox {
  name: AllergensListType;
  value: boolean;
}
export interface AllergensFormProps {
  allergens: AllergensCheckbox[];
}

export function AllergensForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<AllergensFormProps>) {
  return (
    <Form<AllergensFormProps>
      nameForm="Allergens"
      onSubmit={onSubmit}
      modelMode
      saveState={false}
      formProps={{ className: style.allergens_form_container }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          allergens: [],
        },
      }}
    >
      {({ control, register }) => {
        const { append } = useFieldArray<AllergensFormProps>({
          control,
          name: "allergens",
        });

        const checkboxDataArr: CheckBox[] = ALLERGENS_LIST.map(
          (el, i) =>
            ({
              register: register(`allergens.${i}` as any),
              InputProps: {
                onChange: (e) => {
                  append({ name: el, value: e.target.checked });
                },
              },
              LabelProps: { labelText: el },
            } as CheckBox)
        );

        return (
          <div className={style.inputs_container}>
            <div className={style.inputs_layout}>
              <CheckBoxGroup checkboxDataArr={checkboxDataArr} />
            </div>
          </div>
        );
      }}
    </Form>
  );
}
