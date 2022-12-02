/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { NutritionQuestionnaire } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import {
  ModelDisplayContentOptions,
  openModel,
} from "../../../redux/slices/modelControllerSlice";

import {
  curDateTime,
  formatDate,
  addToDate,
  setInDate,
} from "../../../utilities/helpersFun";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";

import CheckBoxGroup, {
  CheckBoxGroupProps,
} from "../../baseComponents/RHF-Components/CheckBoxGroup/CheckboxGroup";

import Form from "../../baseComponents/RHF-Components/Form/Form";
import { nutritionQuestionnaireSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
import RadioButtonsGroup, {
  RadioButtonGroupProps,
} from "../../baseComponents/RHF-Components/RadioButtonsGroup/RadioButtonsGroup";
import style from "./NutritionQuestionnaireForm.module.scss";

export const NUTRITION_QUESTIONNAIRE_NAME = "Nutrition Questionnaire";
export function NutritionQuestionnaireForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<NutritionQuestionnaire>) {
  const dateNow = new Date();
  const { user_id } = useGetUserLoginData();
  const profileID = Number(useParams().id);
  const dispatch = useAppDispatch();

  const createInputIconProps = (modelName: ModelDisplayContentOptions) => ({
    IconEl: FaEdit,
    className: style.edit_icon,
    option: {
      link: "",
      onClick: (id: number) => {
        dispatch(
          openModel({
            displayContent: modelName,
            curParam: id,
          })
        );
      },
    },
  });

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
            ...defaultValues,
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
          },
          resolver: yupResolver(nutritionQuestionnaireSchema),
        }}
      >
        {({ register, formState, getValues, control, watch }) => {
          const {
            day_end,
            day_start,
            // diet_type,
            // isKeepMeatMilk,
            // kosher,
            // is_vegan,
            // is_vegetarian,
            // meals_dist_percents,
            // allergens,
            // favorite_foods,
            // black_list_foods,
          } = formState.errors;

          const checkboxGroupData: CheckBoxGroupProps = {
            checkboxDataArr: [
              {
                register: register("kosher"),
                LabelProps: { labelText: "Kosher?" },
              },
              {
                register: register("isKeepMeatMilk"),
                LabelProps: { labelText: "KeepMeat&Milk?" },
              },
              {
                register: register("is_vegan"),
                LabelProps: { labelText: "Vegan?" },
              },
              {
                register: register("is_vegetarian"),
                LabelProps: { labelText: "Vegetarian?" },
              },
            ],
          };
          const radioButtonsGroupData: RadioButtonGroupProps = {
            radioButtonsDataArr: [
              {
                register: register("diet_type"),
                LabelProps: { labelText: "Neutral?" },
              },
              {
                register: register("diet_type"),
                LabelProps: { labelText: "Cutting?" },
              },
              {
                register: register("diet_type"),
                LabelProps: { labelText: "Bulking?" },
              },
            ],
          };

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

              <CheckBoxGroup
                heading="Rules"
                className={style.checkbox_group}
                checkboxDataArr={checkboxGroupData.checkboxDataArr}
              />
              <RadioButtonsGroup
                heading="Diet Type"
                className={style.checkbox_group}
                radioButtonsDataArr={radioButtonsGroupData.radioButtonsDataArr}
              />

              <InputLabel
                TextAreaProps={{
                  ...register("meals_dist_percents"),
                  disabled: true,
                }}
                inputIconProps={createInputIconProps("mealsDistPercents")}
                LabelProps={{
                  htmlFor: "meals_dist_percents",
                  labelText: "Meal Size In Percents",
                }}
              >
                {/* <InputErrorMessage nameInput="Sleep Time" error={day_end} /> */}
              </InputLabel>
              <InputLabel
                TextAreaProps={{ ...register("allergens"), disabled: true }}
                inputIconProps={createInputIconProps("allergensList")}
                LabelProps={{
                  htmlFor: "allergens",
                  labelText: "Allergens",
                }}
              >
                {/* <InputErrorMessage nameInput="Text" error={allergens} /> */}
              </InputLabel>
              <InputLabel
                TextAreaProps={{
                  ...register("favorite_foods"),
                  disabled: true,
                }}
                inputIconProps={createInputIconProps("favoriteFoods")}
                LabelProps={{
                  htmlFor: "favorite_foods",
                  labelText: "Favorite Food",
                }}
              >
                {/* <InputErrorMessage nameInput="Text" error={favorite_foods} /> */}
              </InputLabel>
              <InputLabel
                TextAreaProps={{
                  ...register("black_list_foods"),
                  disabled: true,
                }}
                inputIconProps={createInputIconProps("blackListFoods")}
                LabelProps={{
                  htmlFor: "black_list_foods",
                  labelText: "Black List Food",
                }}
              >
                {/* <InputErrorMessage nameInput="Text" error={note_text} /> */}
              </InputLabel>
            </>
          );
        }}
      </Form>
    </>
  );
}
