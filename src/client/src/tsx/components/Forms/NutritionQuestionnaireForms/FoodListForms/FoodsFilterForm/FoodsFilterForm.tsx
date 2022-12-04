import { RiRestartFill } from "react-icons/ri";
import {
  KosherType,
  NutrientsTypes,
} from "../../../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  getFilterFoodsFormState,
  resetFormFilters,
} from "../../../../../redux/slices/nutritionQuestionnaireFormStates/filterFoodsFormSlice";
import { GenericRecord } from "../../../../../types";
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
  const {
    favoriteFoodFilterForm: { displayInputsForm },
  } = useAppSelector(getFilterFoodsFormState);
  return (
    <Form<FiltersFoodProps>
      heading={"Filters Food"}
      onSubmit={onSubmit}
      modelMode
      saveState={true}
      formProps={{ className: style.foods_filters_form_container }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          kosher_type: "all",
          nutrient_type: "all",
        },
      }}
    >
      {({ register }) => (
        <>
          <span className={style.reset_button}>
            <RiRestartFill
              onClick={() => {
                dispatch(resetFormFilters({}));
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
          />
          <TextFieldOpenModel
            labelText="Allergens"
            placeholder={
              displayInputsForm.allergensCheckboxesState.allergensStr
            }
            modelName="allergensList"
            register={register}
            nameField="allergens"
            id="filter_foods_form"
          />
          <TextFieldOpenModel
            labelText="Nutrients values"
            placeholder={
              displayInputsForm.nutrientsValuesInputsState.nutrientsValuesStr
            }
            modelName="nutrientsValues"
            register={register}
            nameField="nutrients_values"
          />
        </>
      )}
    </Form>
  );
}

export const FoodsFilterFormContent = () => (
  <ModelFormContainer AddForm={FoodsFilterAddForm} />
);
