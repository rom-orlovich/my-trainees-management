import { useFieldArray } from "react-hook-form";
import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";
import { NutrientsTypes } from "../../../../redux/api/interfaceAPI";
import { GeneralFormProps } from "../../../baseComponents/baseComponentsTypes";
import Form from "../../../baseComponents/RHF-Components/Form/Form";
import { AllergensListType } from "../../../baseComponents/RHF-Components/formsSchemas";
import FoodRulesCheckboxes from "../../NutritionQuestionnaireForms/NutritionQuestionnaireFormComponents/FoodRulesCheckboxes";

import style from "./FoodsFilterForm.module.scss";
import NutrientsTypesRadioButtons from "./FoodsFilterFormComponents/NutrientsTypesRadioButtons";

export interface FiltersFoodProps {
  nutrient_type: NutrientsTypes & "all";
  kosher: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  isKeepMeatMilk: boolean;
  allergens: AllergensListType[];
}

export function FoodsFilterForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<FiltersFoodProps>) {
  const authState = useGetUserLoginData();

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
            <div className="allergens"></div>
            <div className="nutrient_amount"></div>
          </>
        );
      }}
    </Form>
  );
}
