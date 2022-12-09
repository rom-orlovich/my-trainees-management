import { useRef } from "react";
import { useFieldArray } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiRestartFill } from "react-icons/ri";

import { TiDelete } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { getModelControllerState } from "../../../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { FilterFoodFormTypes } from "../../../../../../redux/slices/modelControllerSlices/modelControllerSliceTypes";
import {
  getFilterFoodsFormState,
  resetNutrientsValuesQueryParams,
} from "../../../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";

import { GeneralFormProps } from "../../../../../baseComponents/baseComponentsTypes";
import ModelFormContainer from "../../../../../baseComponents/Model/ModelFormContainer";

import Form from "../../../../../baseComponents/RHF-Components/Form/Form";
import InputIcon from "../../../../../baseComponents/RHF-Components/InputIcon/InputIcon";

import { InputLabel } from "../../../../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { SelectInput } from "../../../../../baseComponents/RHF-Components/SelectInput/SelectInput";
import {
  NutrientsNamesFields,
  NUTRIENTS_NAMES_FIELDS_ARR,
} from "../FoodsFilterForm";
import { NutrientsValuesAddForm } from "./NutrientsValuesAddForm";

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
  const filterFoodForm = useAppSelector(getFilterFoodsFormState);
  const { curParam } = useAppSelector(getModelControllerState);
  const {
    displayInputsForm: {
      nutrientsValuesInputsState: { inputsData },
    },
  } = filterFoodForm[curParam as FilterFoodFormTypes];
  const dispatch = useAppDispatch();
  const selectInputNutrientValuesOptions: SelectInputNutrientValueOptions[] = [
    { value: "caloriesTotal", label: "Calories Total(100g)" },
    { value: "proteinG", label: "Protein(g)" },
    { value: "carbsG", label: "Carbohydrates(g)" },
    { value: "fatG", label: "Fats(g)" },
    { value: "saturatedFatG", label: "Saturated Fat(g)" },
    { value: "cholesterolMg", label: "Cholesterol(mg)" },
    { value: "sugarsG", label: "Sugars(g)" },
    { value: "sodiumMg", label: "Sodium(mg)" },
  ];
  return (
    <Form<NutrientsValuesFormProps>
      heading={"Add Nutrient Value Filter"}
      onSubmit={onSubmit}
      modelMode
      className={style.nutrients_values_form_container}
      saveState={false}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          nutrients_values: inputsData.length
            ? inputsData
            : [{ nutrientName: "caloriesTotal", gt: 1, lt: 100 }],
        },
      }}
    >
      {({ control, register, watch }) => {
        const ref = useRef<HTMLUListElement>(null);

        let curIndex = -1;
        const { fields, append, remove, replace } =
          useFieldArray<NutrientsValuesFormProps>({
            control,
            name: "nutrients_values",
          });

        return (
          <>
            <span className={style.reset_button}>
              <RiRestartFill
                onClick={() => {
                  replace([]);
                  dispatch(
                    resetNutrientsValuesQueryParams({ formKey: curParam })
                  );
                }}
              />
            </span>
            <div className={style.inputs_container}>
              <ul ref={ref} className={style.inputs_layout}>
                {fields.map((el, index) => {
                  const minValue = Number(
                    watch(`nutrients_values.${index}.gt`)
                  );
                  const maxValue = Number(
                    watch(`nutrients_values.${index}.lt`)
                  );
                  curIndex = index;
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
                          min: 1,
                          max: Number.isFinite(maxValue)
                            ? maxValue - 1
                            : undefined,
                        }}
                      />
                      <SelectInput
                        key={`nutrients_values.${index}.nutrientName`}
                        LabelProps={{ labelText: `Nutrient Name` }}
                        options={selectInputNutrientValuesOptions}
                        selectProps={{
                          ...register(
                            `nutrients_values.${index}.nutrientName`,
                            {
                              required: true,
                            }
                          ),
                        }}
                      />
                      <InputLabel
                        key={`nutrients_values.${index}.lt`}
                        LabelProps={{ labelText: `Max` }}
                        InputProps={{
                          ...register(`nutrients_values.${index}.lt`, {
                            required: true,
                          }),

                          type: "number",
                          min: Number.isFinite(minValue)
                            ? minValue + 1
                            : undefined,
                        }}
                      />

                      <TiDelete
                        className={style.delete_button}
                        onClick={() => {
                          remove(index);
                        }}
                      />
                    </li>
                  );
                })}
                <div>
                  <IoMdAddCircleOutline
                    className={style.add_button}
                    onClick={() => {
                      append({
                        gt: 1,
                        nutrientName: NUTRIENTS_NAMES_FIELDS_ARR[curIndex + 1],
                        lt: 100,
                      });

                      setTimeout(() => {
                        ref.current?.lastElementChild?.scrollIntoView({
                          behavior: "smooth",
                          block: "end",
                        });
                      }, 0);
                    }}
                  ></IoMdAddCircleOutline>
                </div>
              </ul>
            </div>
          </>
        );
      }}
    </Form>
  );
}
export const NutrientsValuesFormContent = () => (
  <ModelFormContainer AddForm={NutrientsValuesAddForm} />
);
