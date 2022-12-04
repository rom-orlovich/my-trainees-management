import { useFieldArray } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";

import { TiDelete } from "react-icons/ti";

import { GeneralFormProps } from "../../../../../baseComponents/baseComponentsTypes";

import Form from "../../../../../baseComponents/RHF-Components/Form/Form";
import InputIcon from "../../../../../baseComponents/RHF-Components/InputIcon/InputIcon";

import { InputLabel } from "../../../../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../../../../baseComponents/RHF-Components/SelectInput/SelectInput";
import { NutrientsNamesFields } from "../FoodsFilterForm";

import style from "./NutrientsValuesForm.module.scss";

export interface NutrientValuesInputs {
  nutrientName: NutrientsNamesFields;
  gt: number;
  lt: number;
}
export type NutrientValuesPartial = Partial<NutrientValuesInputs>;
export interface NutrientsValuesFormProps {
  nutrients_values: NutrientValuesPartial[];
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
  const selectInputNutrientValuesOptions: SelectInputNutrientValueOptions[] = [
    { value: "caloriesTotal", label: "Calories Total(100g)" },
    { value: "proteinG", label: "Protein(g)" },
    { value: "carbsG", label: "Carbohydrates(g)" },
    { value: "sugarsG", label: "Fats(g)" },
    { value: "fatG", label: "Saturated Fat(g)" },
    { value: "saturatedFatG", label: "Cholesterol(mg)" },
    { value: "cholesterolMg", label: "Sugars(g)" },
    { value: "sodiumMg", label: "Sodium(mg)" },
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
        const { fields, append, remove } =
          useFieldArray<NutrientsValuesFormProps>({
            control,
            name: "nutrients_values",
          });
        if (!fields.length)
          append({ nutrientName: "caloriesTotal", gt: 1, lt: 300 });

        return (
          <div className={style.inputs_container}>
            <ul className={style.inputs_layout}>
              {fields.map((el, index) => {
                const minValue = watch(`nutrients_values.${index}.gt`);
                const maxValue = watch(`nutrients_values.${index}.lt`);

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
                        max: Number.isFinite(Number(maxValue))
                          ? Number(maxValue)
                          : undefined,
                      }}
                      // inputIconProps={{
                      //   className: style.delete_input,
                      //   IconEl: TiDelete,
                      //   option: {
                      //     onClick: () => {
                      //       remove(index);
                      //     },
                      //     link: "",
                      //   },
                      // }}
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
                      // inputIconProps={{
                      //   IconEl: IoMdAddCircleOutline,
                      //   option: {
                      //     onClick: () => {
                      //       append({
                      //         gt: 1,
                      //         nutrientName: "caloriesTotal",
                      //         lt: 300,
                      //       });
                      //     },
                      //     link: "",
                      //   },
                      // }}
                      InputProps={{
                        ...register(`nutrients_values.${index}.lt`, {
                          required: true,
                        }),

                        type: "number",

                        min: Number.isFinite(Number(minValue))
                          ? Number(minValue)
                          : undefined,
                      }}
                    />
                    {/* <InputIcon
                      IconEl={IoMdAddCircleOutline}
                      option={{
                        onClick: () => {
                          append({
                            gt: 1,
                            nutrientName: "caloriesTotal",
                            lt: 300,
                          });
                        },
                        link: "",
                      }}
                    /> */}
                    <InputIcon
                      className={style.delete_button}
                      IconEl={TiDelete}
                      option={{
                        onClick: () => {
                          if (index > 0) remove(index);
                        },
                        link: "",
                      }}
                    />
                  </li>
                );
              })}

              <InputIcon
                IconEl={IoMdAddCircleOutline}
                option={{
                  onClick: () => {
                    append({
                      gt: 1,
                      nutrientName: "caloriesTotal",
                      lt: 300,
                    });
                  },
                  link: "",
                }}
              />
              {/* 
              <Button
                className={style.add_filter_button}
                onClick={(e) => {
                  e.preventDefault();
                  append({
                    gt: 1,
                    nutrientName: "caloriesTotal",
                    lt: 300,
                  });
                }}
              >
                Add Filter
              </Button> */}
            </ul>
          </div>
        );
      }}
    </Form>
  );
}
