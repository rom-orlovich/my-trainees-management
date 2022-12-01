/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { NutritionQuestionnaire } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import {
  ModelDisplayContentOptions,
  openModel,
} from "../../../redux/slices/modelControllerSlice";

import { formatDate } from "../../../utilities/helpersFun";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { nutritionQuestionnaireSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";
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
          defaultValues: { ...defaultValues, user_id, profile_id: profileID },
          resolver: yupResolver(nutritionQuestionnaireSchema),
        }}
      >
        {({ register, formState }) => {
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
          // console.log(formState.errors);
          return (
            <>
              <InputLabel
                InputProps={{
                  ...register("day_start"),
                  type: "time",
                  defaultValue: formatDate(dateNow) as any,
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

                  defaultValue: formatDate(
                    new Date(dateNow.setDate(dateNow.getDate() + 1))
                  ) as any,
                }}
                LabelProps={{
                  htmlFor: "date_end",
                  labelText: "Sleep Time",
                }}
              >
                <InputErrorMessage nameInput="Sleep Time" error={day_end} />
              </InputLabel>

              <InputLabel
                TextAreaProps={{}}
                // inputIconProps={createInputIconProps("")}
                LabelProps={{
                  htmlFor: "diet_type",
                  labelText: "Diet Type",
                }}
              >
                {/* <InputErrorMessage nameInput="Topic" error={note_topic} /> */}
              </InputLabel>

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
