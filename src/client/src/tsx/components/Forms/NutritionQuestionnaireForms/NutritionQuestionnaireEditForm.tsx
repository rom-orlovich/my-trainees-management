/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useEffect, useRef } from "react";

import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";

import {
  measuresApi,
  nutritionQuestionnaireApi,
} from "../../../redux/api/hooksAPI";
import {
  MeasuresRawAPI,
  NutritionQuestionnaire,
} from "../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getNutritionQuestionnaireFormState,
  setAllergensArr,
  setMealsPercentsArr,
  submitBlackListFoods,
  submitFavoriteFoods,
} from "../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";

import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";

import MeasureForm from "../MeasuresForms/MeasureForms";
import { AllergensListType } from "./AllergensForm/constants";
import { NutritionQuestionnaireForm } from "./NutritionQuestionnaireForm";

function NutritionQuestionnaireEditForm() {
  const [addItem] = nutritionQuestionnaireApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  // If the user is trainee, the query is executed by his userID instead his trainerUserID.
  const { profileID, traineeID, userID } = useGetUserTraineeData();

  const { data, isError, isFetching, isLoading } =
    nutritionQuestionnaireApi.useGetItemsQuery({
      userID,
      profileID,
    });

  const { serverQueryProps } = useAppSelector(
    getNutritionQuestionnaireFormState
  );
  const re = useRef(true);
  useEffect(() => {
    const results = data?.data;
    if (!results) return;
    const lastData = results[results?.length - 1];
    if (!lastData) return;
    if (re.current) {
      dispatch(
        setMealsPercentsArr(
          lastData.meals_calories_size_percents?.map((el) => ({
            percents: el,
          }))
        )
      );
      dispatch(
        setAllergensArr(
          lastData.allergens.map((el) => ({
            name: el as AllergensListType,
            value: true,
          }))
        )
      );
      dispatch(submitFavoriteFoods(lastData.favorite_foods));
      dispatch(submitBlackListFoods(lastData.black_list_foods));
      re.current = false;
    }
  }, [data?.data]);

  return (
    <LoadingSpinner
      path={`/${APP_ROUTE.PROFILE_ROUTE}/${APP_ROUTE.NUTRITION_QUESTIONNAIRE_ROUTE}/${APP_ROUTE.NUTRITION_QUESTIONNAIRE_ADD_ROUTE}?profileID=${profileID}`}
      nameData="Nutrition Questionnaire"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {(data) => {
        const results = data.data;
        const lastData = results[results.length - 1];
        const {
          nutrition_questionnaire_id,
          day_start,
          day_end,
          kosher,
          is_vegan,
          is_vegetarian,
          diet_type,
        } = lastData;
        const handleSubmit = (body: NutritionQuestionnaire) =>
          addFunction({
            addItem,
          })({
            ...body,
            nutrition_questionnaire_id: lastData.nutrition_questionnaire_id,
            ...serverQueryProps,
          });

        return (
          <NutritionQuestionnaireForm
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={
              {
                nutrition_questionnaire_id,
                day_start,
                day_end,
                kosher,
                is_vegan,
                is_vegetarian,
                diet_type,
              } as any
            }
          />
        );
      }}
    </LoadingSpinner>
  );
}

export default NutritionQuestionnaireEditForm;
