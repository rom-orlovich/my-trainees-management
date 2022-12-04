/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";

import { format } from "date-fns";

import { useParams } from "react-router-dom";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { NutritionQuestionnaire } from "../../../redux/api/interfaceAPI";
import { useAppSelector } from "../../../redux/hooks";

import { getNutritionQuestionnaireFormState } from "../../../redux/slices/nutritionQuestionnaireFormStates/nutritionQuestionnaireFormSlice";

import { setInDate } from "../../../utilities/helpersFun";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";

import Form from "../../baseComponents/RHF-Components/Form/Form";
import { nutritionQuestionnaireSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

import TextFieldOpenModel from "../../baseComponents/RHF-Components/TextFieldRHFOpenModel/TextFieldRHFOpenModel";
import style from "./NutritionQuestionnaireForm.module.scss";
import DietTypesRadioButtons from "./NutritionQuestionnaireFormComponents/DietTypesRadioButtons";
import FoodRulesCheckboxes from "./NutritionQuestionnaireFormComponents/FoodRulesCheckboxes";

export const NUTRITION_QUESTIONNAIRE_NAME = "Nutrition Questionnaire";
export function NutritionQuestionnaireForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<NutritionQuestionnaire>) {
  const { user_id } = useGetUserLoginData();
  const profileID = Number(useParams().id);
  const { displayInputsForm } = useAppSelector(
    getNutritionQuestionnaireFormState
  );

  return (
    <>
      <Form<NutritionQuestionnaire>
        buttonNext={!editMode}
        heading={`${NUTRITION_QUESTIONNAIRE_NAME}`}
        onSubmit={onSubmit}
        saveState={false}
        editMode={editMode}
        className={style.nutrition_questionnaire_form_container}
        formOptions={{
          defaultValues: {
            user_id,
            day_start: format(
              setInDate({ setHour: 8, setMinutes: 0.5 }),
              "HH:mm"
            ) as any,
            day_end: format(
              setInDate({ setHour: 23, setMinutes: 59 }),
              "HH:mm"
            ) as any,
            profile_id: profileID,
            diet_type: "neutral",
            meals_calories_size_percents: [],
            ...defaultValues,
          },
          resolver: yupResolver(nutritionQuestionnaireSchema),
        }}
      >
        {({ register, formState }) => {
          const { day_end, day_start } = formState.errors;

          return (
            <>
              <div className={style.time_activity}>
                <InputLabel
                  InputProps={{
                    ...register("day_start"),
                    type: "time",
                  }}
                  LabelProps={{
                    htmlFor: "date_start",
                    labelText: "Wake Up Time",
                  }}
                >
                  <InputErrorMessage
                    nameInput="Wake Up Time"
                    error={day_start}
                  />
                </InputLabel>
                <InputLabel
                  InputProps={{
                    ...register("day_end"),
                    type: "time",
                  }}
                  LabelProps={{
                    htmlFor: "date_end",
                    labelText: "Sleep Time",
                  }}
                >
                  <InputErrorMessage nameInput="Sleep Time" error={day_end} />
                </InputLabel>
              </div>
              <FoodRulesCheckboxes
                register={register}
                className={style.inputs_group}
              />
              <DietTypesRadioButtons
                register={register}
                className={style.inputs_group}
              />
              <TextFieldOpenModel
                labelText="Meals Size"
                placeholder={displayInputsForm.mealsPercentsStr}
                modelName="mealsDistPercents"
                register={register}
                nameField="meals_calories_size_percents"
              />
              <TextFieldOpenModel
                labelText="Allergens"
                placeholder={
                  displayInputsForm.allergenCheckboxState.allergensStr
                }
                modelName="allergensList"
                register={register}
                nameField="allergens"
              />
              <TextFieldOpenModel
                labelText="Favorite Foods"
                placeholder={displayInputsForm.favoriteFoodsName}
                modelName="favoriteFoods"
                register={register}
                nameField="favorite_foods"
              />
              <TextFieldOpenModel
                labelText="Blacklist Foods"
                placeholder={""}
                modelName="blackListFoods"
                register={register}
                nameField="black_list_foods"
              />
            </>
          );
        }}
      </Form>
    </>
  );
}
