import { useFieldArray } from "react-hook-form";
import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";
import { NutrientsTypes } from "../../../../redux/api/interfaceAPI";
import { GeneralFormProps } from "../../../baseComponents/baseComponentsTypes";
import Form from "../../../baseComponents/RHF-Components/Form/Form";
import { AllergensListType } from "../../../baseComponents/RHF-Components/formsSchemas";
import TextFieldOpenModel from "../../../baseComponents/RHF-Components/TextFieldRHFOpenModel/TextFieldRHFOpenModel";
import FoodRulesCheckboxes from "../../NutritionQuestionnaireForms/NutritionQuestionnaireFormComponents/FoodRulesCheckboxes";

import style from "./FoodsFilterForm.module.scss";
import NutrientsTypesRadioButtons from "./FoodsFilterFormComponents/NutrientsTypesRadioButtons";

export type NutrientsAmounts =
  | "calories_total"
  | "protein_g"
  | "carbs_g"
  | "sugars_g"
  | "fat_g"
  | "saturated_fat"
  | "cholesterol_mg"
  | "sodium_mg";

export interface FiltersFoodProps {
  nutrient_type: NutrientsTypes & "all";
  kosher: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  isKeepMeatMilk: boolean;
  allergens: AllergensListType[];
  nutrients_amounts: {
    gt: number;
    lt: number;
    compare_nutrient: NutrientsAmounts;
  }[];
}

export function FoodsFilterForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<FiltersFoodProps>) {
  const authState = useGetUserLoginData();
  const allergensPlaceholderStr = []
    .reduce((pre, cur, i) => `${pre} ${cur},`, "")
    .slice(0, -1);
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
          allergens: [],
        },
      }}
    >
      {({ control, register, formState }) => {
        const { fields, append } = useFieldArray<{}>({
          control,
          name: "",
        } as any);

        return (
          <>
            <NutrientsTypesRadioButtons
              className={style.nutrient_type_radio_buttons}
              register={register}
            />
            <FoodRulesCheckboxes
              className={style.foods_rules_checkboxes}
              register={register}
            />
            <TextFieldOpenModel
              labelText="Allergens"
              placeholder={allergensPlaceholderStr}
              modelName="allergensList"
              register={register}
              nameField="allergens"
            />
            <TextFieldOpenModel
              labelText="Allergens"
              placeholder={allergensPlaceholderStr}
              modelName="allergensList"
              register={register}
              nameField="allergens"
            />
            <div className="nutrient_amount"></div>
          </>
        );
      }}
    </Form>
  );
}
