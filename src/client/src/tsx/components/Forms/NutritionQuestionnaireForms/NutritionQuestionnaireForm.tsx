/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { getValue } from "@testing-library/user-event/dist/types/utils";
import { format } from "date-fns";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { NutritionQuestionnaire } from "../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  ModelDisplayContentOptions,
  openModel,
} from "../../../redux/slices/modelControllerSlice";
import { getNutritionQuestionnaireState } from "../../../redux/slices/nutritionQuestionnaireSlice";

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

  const questionnaireState = useAppSelector(getNutritionQuestionnaireState);

  const allergensPlaceholderStr = questionnaireState.allergens
    .reduce((pre, cur, i) => `${pre} ${cur},`, "")
    .slice(0, -1);

  const mealsPercentsPlaceholderStr = questionnaireState.mealsPercents
    .reduce((pre, cur, i) => `${pre} Meal ${i + 1} ${cur}%,`, "")
    .slice(0, -1);
  return (
    <>
      <Form<NutritionQuestionnaire>
        buttonNext={!editMode}
        heading={`${NUTRITION_QUESTIONNAIRE_NAME}`}
        onSubmit={onSubmit}
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
            kosher: false,
            is_vegan: false,
            is_vegetarian: false,
            isKeepMeatMilk: false,
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
                <InputErrorMessage nameInput="Wake Up Time" error={day_start} />
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
                placeholder={mealsPercentsPlaceholderStr}
                modelName="mealsDistPercents"
                register={register}
                nameField="meals_calories_size_percents"
              />
              <TextFieldOpenModel
                labelText="Allergens"
                placeholder={allergensPlaceholderStr}
                modelName="allergensList"
                register={register}
                nameField="allergens"
              />
              <TextFieldOpenModel
                labelText="Favorite Foods"
                placeholder={""}
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
