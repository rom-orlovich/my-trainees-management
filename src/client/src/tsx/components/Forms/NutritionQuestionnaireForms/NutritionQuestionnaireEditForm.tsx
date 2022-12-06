/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";

import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";

import {
  measuresApi,
  nutritionQuestionnaireApi,
} from "../../../redux/api/hooksAPI";
import {
  MeasuresRawAPI,
  NutritionQuestionnaire,
} from "../../../redux/api/interfaceAPI";
import { NutritionQuestionnaireFormState } from "../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormsSliceTypes";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import {
  addFunction,
  updateFunction,
} from "../../baseComponents/RHF-Components/FormsHook";

import MeasureForm from "../MeasuresForms/MeasureForms";
import { NutritionQuestionnaireForm } from "./NutritionQuestionnaireForm";

function NutritionQuestionnaireEditForm() {
  const [addItem] = nutritionQuestionnaireApi.useCreateOneItemMutation();

  // If the user is trainee, the query is executed by his userID instead his trainerUserID.
  const { profileID, traineeID, userID } = useGetUserTraineeData();

  const { data, isError, isFetching, isLoading } =
    nutritionQuestionnaireApi.useGetItemsQuery({
      userID,
      profileID,
    });
  const lastData = data?.data[data?.data?.length - 1];
  console.log("🚀 ~ file: NutritionQuestionnaireForm.tsx:46 ~ data", data);
  console.log(lastData);

  return (
    <LoadingSpinner
      path={`/${APP_ROUTE.TRAINEES_ROUTE}/${traineeID}/${APP_ROUTE.PROFILE_ROUTE}/${APP_ROUTE.NUTRITION_QUESTIONNAIRE_ROUTE}/${APP_ROUTE.NUTRITION_QUESTIONNAIRE_ADD_ROUTE}?profileID=${profileID}`}
      nameData="Nutrition Questionnaire"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {(data) => {
        const results = data.data;
        const lastData = results[results.length - 1];

        const handleSubmit = (body: NutritionQuestionnaire) =>
          addFunction({
            addItem,
          })(body);

        return (
          <NutritionQuestionnaireForm
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={{
              ...lastData,
            }}
          />
        );
      }}
    </LoadingSpinner>
  );
}

export default NutritionQuestionnaireEditForm;
