import useGetUserLoginData from "../../../../../hooks/useGetUserLoginData";
import {
  KosherType,
  NutrientsTypes,
} from "../../../../../redux/api/interfaceAPI";
import { useAppSelector } from "../../../../../redux/hooks";
import { getFilterFoodsFormState } from "../../../../../redux/slices/filterFoodsFormSlice";
import { GenericRecord } from "../../../../../types";
import { GeneralFormProps } from "../../../../baseComponents/baseComponentsTypes";
import Form from "../../../../baseComponents/RHF-Components/Form/Form";

import TextFieldOpenModel from "../../../../baseComponents/RHF-Components/TextFieldRHFOpenModel/TextFieldRHFOpenModel";
import { AllergensListType } from "../../AllergensForm/constants";
import FoodRulesCheckboxes from "../../NutritionQuestionnaireFormComponents/FoodRulesCheckboxes";

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

export interface FiltersFoodProps {
  nutrient_type: NutrientsTypes | "all";
  kosher_type: KosherType | "all";
  kosher: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  allergens: AllergensListType[];
  nutrients_values: GenericRecord<number>[];
}

export function FoodsFilterForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<FiltersFoodProps>) {
  const authState = useGetUserLoginData();
  const { nutrientsValuesStr, allergensStr } = useAppSelector(
    getFilterFoodsFormState
  );
  return (
    <Form<FiltersFoodProps>
      heading={"Filters Food"}
      onSubmit={onSubmit}
      modelMode
      saveState={false}
      formProps={{ className: style.foods_filters_form_container }}
      editMode={editMode}
      formOptions={{
        defaultValues: {
          ...defaultValues,
          nutrient_type: "all",
          kosher_type: "all",
          allergens: [],
        },
      }}
    >
      {({ control, register }) => (
        <>
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
            placeholder={allergensStr}
            modelName="allergensList"
            register={register}
            nameField="allergens"
            id="filter_foods_form"
          />
          <TextFieldOpenModel
            labelText="Nutrients values"
            placeholder={nutrientsValuesStr}
            modelName="nutrientsValues"
            register={register}
            nameField="nutrients_values"
          />
          <div className="nutrient_amount"></div>
        </>
      )}
    </Form>
  );
}
