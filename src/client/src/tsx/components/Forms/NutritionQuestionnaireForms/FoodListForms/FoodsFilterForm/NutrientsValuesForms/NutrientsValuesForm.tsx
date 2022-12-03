import { useFieldArray } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";

import useGetUserLoginData from "../../../../../../hooks/useGetUserLoginData";

import { GeneralFormProps } from "../../../../../baseComponents/baseComponentsTypes";
import Form from "../../../../../baseComponents/RHF-Components/Form/Form";

import { InputLabel } from "../../../../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../../../../baseComponents/RHF-Components/SelectInput/SelectInput";
import { NutrientsNamesFields } from "../FoodsFilterForm";

import style from "./NutrientsValuesForm.module.scss";

export type NutrientValuesGenericCompare =
  | `${NutrientsNamesFields}_lt`
  | `${NutrientsNamesFields}_gt`;

export type NutrientValues = {
  nutrientName: NutrientsNamesFields;
  gt: number;
  lt: number;
};
export interface NutrientsValuesFormProps {
  nutrients_values: Partial<NutrientValues>[];
}
export interface SelectInputNutrientValueOptions {
  value: NutrientsNamesFields;
  label: string;
}
export function NutrientsValuesForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<NutrientsValuesFormProps>) {
  const authState = useGetUserLoginData();
  const selectInputNutrientValuesOptions: SelectInputNutrientValueOptions[] = [
    { value: "calories_total", label: "Calories Total(100g)" },
    { value: "protein_g", label: "Protein(g)" },
    { value: "carbs_g", label: "Carbohydrates(g)" },
    { value: "fat_g", label: "Fats(g)" },
    { value: "saturated_fat", label: "Saturated Fat(g)" },
    { value: "cholesterol_mg", label: "Cholesterol(mg)" },
    { value: "sugars_g", label: "Sugars(g)" },
    { value: "sodium_mg", label: "Sodium(mg)" },
  ];
  return (
    <Form<NutrientsValuesFormProps>
      nameForm="Meal Size"
      onSubmit={onSubmit}
      modelMode
      saveState={false}
      formProps={{ className: style.nutrients_values_form_container }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          nutrients_values: [],
        },
      }}
    >
      {({ control, register, formState, watch }) => {
        const { fields, append, update } =
          useFieldArray<NutrientsValuesFormProps>({
            control,
            name: "nutrients_values",
          });
        if (!fields.length)
          append({ nutrientName: "calories_total", gt: 1, lt: 300 });

        return (
          <div className={style.inputs_container}>
            <ul className={style.inputs_layout}>
              {fields.map((el, index) => {
                const minValue = watch(`nutrients_values.${index}.gt`);
                const maxValue = watch(`nutrients_values.${index}.lt`);
                console.log(maxValue);

                return (
                  <li key={el.id}>
                    <InputLabel
                      key={`nutrients_values.${index}.gt`}
                      LabelProps={{ labelText: `Min` }}
                      InputProps={{
                        ...register(`nutrients_values.${index}.gt`, {
                          required: true,
                          min: 0,
                        }),

                        type: "number",
                        max: Number(maxValue),
                      }}
                    />
                    <SelectInput
                      key={`nutrients_values.${index}.nutrientName`}
                      LabelProps={{ labelText: `Nutrient Name` }}
                      options={selectInputNutrientValuesOptions}
                      selectProps={{
                        ...register(`nutrients_values.${index}.nutrientName`, {
                          required: true,
                        }),
                      }}
                    />
                    <InputLabel
                      key={`nutrients_values.${index}.lt`}
                      LabelProps={{ labelText: `Max` }}
                      inputIconProps={{
                        IconEl: IoMdAddCircleOutline,
                        option: {
                          onClick: () => {
                            append({
                              gt: 1,
                              nutrientName: "calories_total",
                              lt: 300,
                            });
                          },
                          link: "",
                        },
                      }}
                      InputProps={{
                        ...register(`nutrients_values.${index}.lt`, {
                          required: true,
                        }),

                        type: "number",

                        min: Number(minValue) + 1,
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }}
    </Form>
  );
}
