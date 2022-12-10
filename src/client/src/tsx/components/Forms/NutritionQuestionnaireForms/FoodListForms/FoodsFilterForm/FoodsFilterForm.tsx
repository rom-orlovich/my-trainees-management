import { RiRestartFill } from "react-icons/ri";
import {
  KosherType,
  NutrientsTypes,
} from "../../../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { getModelControllerState } from "../../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { FilterFoodFormTypes } from "../../../../../redux/slices/modelControllerSlices/modelControllerSliceTypes";
import {
  getFilterFoodsFormState,
  resetFormFiltersForm,
} from "../../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";
import { GenericRecord } from "../../../../../types";
import { genClassName } from "../../../../../utilities/helpersFun";
import { GeneralFormProps } from "../../../../baseComponents/baseComponentsTypes";
import ModelFormContainer from "../../../../baseComponents/Model/ModelFormContainer";
import Form from "../../../../baseComponents/RHF-Components/Form/Form";
import TextFieldOpenModel from "../../../../baseComponents/RHF-Components/TextFieldRHFOpenModel/TextFieldRHFOpenModel";
import { AllergensListType } from "../../AllergensForm/constants";
import FoodRulesCheckboxes from "../../NutritionQuestionnaireFormComponents/FoodRulesCheckboxes";
import { FoodsFilterAddForm } from "./FoodsFilterAddForm";

import style from "./FoodsFilterForm.module.scss";
import KosherTypeRadioButtons from "./FoodsFilterFormComponents/KosherTypeRadioButtons";
import NutrientsTypesRadioButtons from "./FoodsFilterFormComponents/NutrientsTypesRadioButtons";

export type NutrientsNamesFields =
  | "caloriesTotal"
  | "proteinG"
  | "carbsG"
  | "sugarsG"
  | "fatG"
  | "saturatedFatG"
  | "cholesterolMg"
  | "sodiumMg";
export const NUTRIENTS_NAMES_FIELDS_ARR = [
  "caloriesTotal",
  "proteinG",
  "carbsG",
  "sugarsG",
  "fatG",
  "saturatedFatG",
  "cholesterolMg",
  "sodiumMg",
] as const;
export interface FiltersFoodProps {
  nutrient_type: NutrientsTypes | "all";
  kosher_type: KosherType | "all";
  kosher?: boolean;
  is_vegan?: boolean;
  is_vegetarian?: boolean;
  allergens?: AllergensListType[];
  nutrients_values?: GenericRecord<number>[];
}

export function FoodsFilterForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<FiltersFoodProps>) {
  const dispatch = useAppDispatch();
  const filterFoodForm = useAppSelector(getFilterFoodsFormState);

  const { curParam } = useAppSelector(getModelControllerState);
  if (!curParam) return <></>;
  const curFilterFoodFormState =
    filterFoodForm[curParam as FilterFoodFormTypes];

  return (
    <Form<FiltersFoodProps>
      heading={"Filters Food"}
      onSubmit={onSubmit}
      modelMode
      className={genClassName(style.foods_filters_form_container, curParam)}
      saveState={true}
      formProps={{ className: style.form_layout }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          kosher_type: "all",
          nutrient_type: "all",
          ...defaultValues,
        },
      }}
    >
      {({ register }) => (
        <>
          <span className={style.reset_button}>
            <RiRestartFill
              onClick={() => {
                dispatch(resetFormFiltersForm({ formKey: curParam }));
              }}
            />
          </span>
          <NutrientsTypesRadioButtons
            className={style.nutrient_type_radio_buttons}
            register={register}
          />
          <KosherTypeRadioButtons
            className={style.nutrient_type_radio_buttons}
            register={register}
          />
          <FoodRulesCheckboxes
            className={style.foods_rules_checkboxes}
            register={register}
            keepMeatMeal={false}
          />
          <TextFieldOpenModel
            labelText="Allergens"
            placeholder={
              curFilterFoodFormState?.displayInputsForm
                ?.allergensCheckboxesState?.inputsStr
            }
            modelName="allergensList"
            register={register}
            nameField="allergens"
            curParam={curParam}
          />
          <TextFieldOpenModel
            labelText="Nutrients values"
            placeholder={
              curFilterFoodFormState?.displayInputsForm
                ?.nutrientsValuesInputsState?.inputsStr
            }
            modelName="nutrientsValues"
            register={register}
            nameField="nutrients_values"
            curParam={curParam}
          />
        </>
      )}
    </Form>
  );
}

export const FoodsFilterFormContent = () => (
  <ModelFormContainer AddForm={FoodsFilterAddForm} />
);
