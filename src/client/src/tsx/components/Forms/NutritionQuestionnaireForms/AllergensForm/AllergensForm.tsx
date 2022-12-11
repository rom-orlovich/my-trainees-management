import { useRef } from "react";
import { useFieldArray } from "react-hook-form";
import { RiRestartFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getModelControllerState } from "../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { FilterFoodFormTypes } from "../../../../redux/slices/modelControllerSlices/modelControllerSliceTypes";
import {
  getFilterFoodsFormState,
  resetAllergenForm,
} from "../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";
import {
  CHECKBOXES_ALLERGENS,
  getNutritionQuestionnaireFormState,
  resetAllergensArr,
} from "../../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";
import { resetAllergensFoodsByFormFun } from "../../../../redux/slices/nutritionQuestionnaireFormSlices/utilities/helpersFilterFoodFormSlice";

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
  const { curParam } = useAppSelector(getModelControllerState);
  const dispatch = useAppDispatch();

  let allergensState: AllergensCheckbox[] = CHECKBOXES_ALLERGENS;

  let displayInput;
  // Set the current allergen checkboxes state according to the current form display
  if (curParam === "nutritionQuestionnaire")
    displayInput = displayInputsForm.allergenCheckboxState;
  else
    displayInput =
      fitterFormState[curParam as FilterFoodFormTypes].displayInputsForm
        .allergensCheckboxesState;
  allergensState = displayInput.inputsData;
  
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
          allergens: allergensState,
        },
      }}
    >
      {({ control, register }) => {
        const { update, replace, fields } = useFieldArray<AllergensFormProps>({
          control,
          name: "allergens",
        });

        // **NOTE: For some reason the allergen fields reset in every time the component mount.
     
        if (fields.length === 0) {
          replace(allergensState);
        }

        const checkboxDataArr: CheckBox[] = fields.map((allergen, i) => ({
          LabelProps: { labelText: allergen.name },
          register: register(`allergens.${i}.value` as const),
          InputProps: {
            onChange: (e) => {
              update(i, { name: allergen.name, value: e.target.checked });
            },
            checked: allergen.value,
          },
        }));

        return (
          <>
            <span className={style.reset_button}>
              <RiRestartFill
                onClick={() => {
                  replace(CHECKBOXES_ALLERGENS);
                  if (curParam === "nutritionQuestionnaire")
                    dispatch(resetAllergensArr());
                  else dispatch(resetAllergenForm({ formKey: curParam }));
                }}
              />
            </span>
            <div className={style.inputs_container}>
              <div className={style.inputs_layout}>
                <CheckBoxGroup checkboxDataArr={checkboxDataArr} />
              </div>
            </div>
          </>
        );
      }}
    </Form>
  );
}

export const AllergensFormContent = () => (
  <ModelFormContainer AddForm={AllergensAddForm} />
);
