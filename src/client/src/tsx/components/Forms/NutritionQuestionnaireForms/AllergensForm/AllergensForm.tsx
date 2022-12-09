import { useFieldArray } from "react-hook-form";
import { useAppSelector } from "../../../../redux/hooks";
import { getModelControllerState } from "../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { FilterFoodFormTypes } from "../../../../redux/slices/modelControllerSlices/modelControllerSliceTypes";
import { getFilterFoodsFormState } from "../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";
import { getNutritionQuestionnaireFormState } from "../../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";

import { GeneralFormProps } from "../../../baseComponents/baseComponentsTypes";
import ModelFormContainer from "../../../baseComponents/Model/ModelFormContainer";
import { CheckBox } from "../../../baseComponents/RHF-Components/CheckBoxGroup/Checkbox";
import CheckBoxGroup from "../../../baseComponents/RHF-Components/CheckBoxGroup/CheckboxGroup";
import Form from "../../../baseComponents/RHF-Components/Form/Form";
import { AllergensAddForm } from "./AllergensAddForm";

import style from "./AllergensForm.module.scss";
import { AllergensListType, ALLERGENS_LIST } from "./constants";

export interface AllergensCheckbox {
  name: AllergensListType;
  value: boolean;
}
export interface AllergensFormProps {
  allergens: AllergensCheckbox[];
}

export function AllergensForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<AllergensFormProps>) {
  const fitterFormState = useAppSelector(getFilterFoodsFormState);
  const { displayInputsForm } = useAppSelector(
    getNutritionQuestionnaireFormState
  );
  const { curParam, lastModel } = useAppSelector(getModelControllerState);
  let defaultAllergens = ALLERGENS_LIST.map((el) => ({
    name: el as AllergensListType,
    value: false,
  }));
  let allergensState = [];
  if (lastModel === "filterFoodsForm") {
    allergensState =
      fitterFormState[curParam as FilterFoodFormTypes].displayInputsForm
        .allergensCheckboxesState.inputsData;
  } else {
    allergensState = displayInputsForm.allergenCheckboxState.inputsData;
  }
  defaultAllergens = allergensState.length ? allergensState : defaultAllergens;

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
          allergens: defaultAllergens,
        },
      }}
    >
      {({ control, register }) => {
        const { update } = useFieldArray<AllergensFormProps>({
          control,
          name: "allergens",
        });

        const checkboxDataArr: CheckBox[] = defaultAllergens.map(
          (allergen, i) =>
            ({
              register: register(`allergens.${i}.value` as any),
              InputProps: {
                onChange: (e) => {
                  update(i, { name: allergen.name, value: e.target.checked });
                },
              },
              LabelProps: { labelText: allergen.name },
            } as CheckBox)
        );

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

export const AllergensFormContent = () => (
  <ModelFormContainer AddForm={AllergensAddForm} />
);
