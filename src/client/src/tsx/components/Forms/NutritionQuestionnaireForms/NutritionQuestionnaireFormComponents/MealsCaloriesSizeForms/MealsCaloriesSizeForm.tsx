import { useRef } from "react";
import { useFieldArray } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiRestartFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

import useGetUserLoginData from "../../../../../hooks/useGetUserLoginData";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { resetFormFiltersForm } from "../../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";
import {
  getNutritionQuestionnaireFormState,
  resetMealsPercentsArr,
} from "../../../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";

import { GeneralFormProps } from "../../../../baseComponents/baseComponentsTypes";
import ModelFormContainer from "../../../../baseComponents/Model/ModelFormContainer";
import Form from "../../../../baseComponents/RHF-Components/Form/Form";

import { InputLabel } from "../../../../baseComponents/RHF-Components/InputLabel/InputLabel";
import { MealsCaloriesSizeAddForm } from "./MealsCaloriesSizeAddForm";

import style from "./MealsCaloriesSizeForm.module.scss";

export interface MealsCaloriesSize {
  percents: number;
}
export interface MealsCaloriesSizeFormProps {
  mealsCaloriesPercents: MealsCaloriesSize[];
}
export function MealsCaloriesSizeForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<MealsCaloriesSizeFormProps>) {
  const first = 33;
  let curIndex = 0;
  const {
    displayInputsForm: {
      mealsPercentsState: { inputsData },
    },
  } = useAppSelector(getNutritionQuestionnaireFormState);
  const ref = useRef<HTMLUListElement>(null);
  const dispatch = useAppDispatch();
  const mealsSize = inputsData.length ? inputsData : [{ percents: first }];
  return (
    <Form<MealsCaloriesSizeFormProps>
      nameForm="Meal Size"
      onSubmit={onSubmit}
      modelMode
      saveState={false}
      className={style.meals_calories_size_percents_form}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          mealsCaloriesPercents: mealsSize,
          ...defaultValues,
        },
      }}
    >
      {({ control, register }) => {
        const { fields, append, remove, replace } =
          useFieldArray<MealsCaloriesSizeFormProps>({
            control,
            name: "mealsCaloriesPercents",
          });

        return (
          <>
            <span className={style.reset_button}>
              <RiRestartFill
                onClick={() => {
                  replace([]);
                  dispatch(resetMealsPercentsArr());
                }}
              />
            </span>

            <div className={style.inputs_container}>
              <ul ref={ref} className={style.inputs_layout}>
                {fields.map((el, index) => {
                  curIndex = index;
                  return (
                    <li key={el.id}>
                      <InputLabel
                        key={`mealsCaloriesPercents[${index}]`}
                        LabelProps={{ labelText: `Meal ${index + 1} (%)` }}
                        InputProps={{
                          ...register(
                            `mealsCaloriesPercents.${index}.percents`,
                            {
                              required: true,
                            }
                          ),

                          type: "number",
                          min: 1,
                          max: 100,
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
                      const lastEl = fields[curIndex];
                      append({ percents: lastEl.percents });
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
export const MealsCaloriesSizeFormContent = () => (
  <ModelFormContainer AddForm={MealsCaloriesSizeAddForm} />
);
