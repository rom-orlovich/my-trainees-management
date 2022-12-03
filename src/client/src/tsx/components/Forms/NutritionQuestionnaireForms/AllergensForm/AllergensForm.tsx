import { useFieldArray } from "react-hook-form";

import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";

import { GeneralFormProps } from "../../../baseComponents/baseComponentsTypes";
import { CheckBox } from "../../../baseComponents/RHF-Components/CheckBoxGroup/Checkbox";
import CheckBoxGroup from "../../../baseComponents/RHF-Components/CheckBoxGroup/CheckboxGroup";
import Form from "../../../baseComponents/RHF-Components/Form/Form";
import {
  AllergensListType,
  ALLERGENS_LIST,
} from "../../../baseComponents/RHF-Components/formsSchemas";

import style from "./AllergensForm.module.scss";

export interface AllergensFormProps {
  allergens: AllergensListType[];
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
      {({ control, register, formState }) => {
        const { fields, append } = useFieldArray<AllergensFormProps>({
          control,
          name: "allergens",
        } as any);

        const checkboxDataArr: CheckBox[] = ALLERGENS_LIST.map((el, i) => {
          const { onChange } = register(`allergens.${i}` as any);
          return {
            register: register(`allergens.${i}` as any),
            InputProps: {
              onChange: (e) => {
                append(ALLERGENS_LIST[i]);
              },
            },
            LabelProps: { labelText: el },
          } as CheckBox;
        });

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
