import React from "react";
import ModelMeetingContent from "../../../pages/SchedulePage/ModelMeetingContent/ModelMeetingContent";
import { useAppSelector } from "../../../redux/hooks";

import { getModelControllerState } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";
import ModelActivityFormContent from "../../Forms/ActivityForms/ModelActivityFormContent";

import ModelCityFormContent from "../../Forms/CityForms/ModelCityFormContent";
import ModelEquipmentFormContent from "../../Forms/EquipmentForms/ModelEquipmentFormContent";
import ModelExerciseFormContent from "../../Forms/ExerciseForms/ModelExerciseFormContent";

import ModelLocationFormContent from "../../Forms/LocationForms/ModelLocationFormContent";

import ModelMuscleGroupFormContent from "../../Forms/MusclesGroupForms/ModelMuscleGroupFormContent";
import ModelParticipantsGroupFormContent from "../../Forms/ParticipantsGroupForm/ModelParticipantsGroupFormContent";

import ModelProductFormContent from "../../Forms/ProductsForms/ModelProductFormContent";
import ModelSubscriptionPlansFormContent from "../../Forms/SubscriptionPlansForms/ModelSubscriptionPlansFormContent";
import ModelCard from "./ModelCard";

import { FoodsListFormContent } from "../../Forms/NutritionQuestionnaireForms/FoodListForms/FoodsListForm";
import { FoodsFilterFormContent } from "../../Forms/NutritionQuestionnaireForms/FoodListForms/FoodsFilterForm/FoodsFilterForm";
import { NutrientsValuesFormContent } from "../../Forms/NutritionQuestionnaireForms/FoodListForms/FoodsFilterForm/NutrientsValuesForms/NutrientsValuesForm";
import { ModelParticipantsGroupListFormContent } from "../../Forms/ParticipantsGroupsListForms/ParticipantsGroupsListForm";
import FoodDetails from "../../Forms/NutritionQuestionnaireForms/FoodListForms/FoodsList/FoodDetails/FoodDetails";
import { AllergensFormContent } from "../../Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { MealsCaloriesSizeFormContent } from "../../Forms/NutritionQuestionnaireForms/NutritionQuestionnaireFormComponents/MealsCaloriesSizeForms/MealsCaloriesSizeForm";

function ModelController() {
  const { lastModel } = useAppSelector(getModelControllerState);
  let content = <></>;
  if (lastModel === "meeting") content = <ModelMeetingContent />;
  else if (lastModel === "participantsGroupsListForm")
    content = <ModelParticipantsGroupListFormContent />;
  else if (lastModel === "participantForm")
    content = <ModelParticipantsGroupFormContent />;
  else if (lastModel === "activityForm") content = <ModelActivityFormContent />;
  else if (lastModel === "locationForm") content = <ModelLocationFormContent />;
  else if (lastModel === "cityForm") content = <ModelCityFormContent />;
  else if (lastModel === "productForm") content = <ModelProductFormContent />;
  else if (lastModel === "exerciseForm") content = <ModelExerciseFormContent />;
  else if (lastModel === "muscleGroupForm")
    content = <ModelMuscleGroupFormContent />;
  else if (lastModel === "equipmentForm")
    content = <ModelEquipmentFormContent />;
  else if (lastModel === "subscriptionPlansForm")
    content = <ModelSubscriptionPlansFormContent />;
  else if (lastModel === "mealsDistPercents")
    content = <MealsCaloriesSizeFormContent />;
  else if (lastModel === "allergensList") content = <AllergensFormContent />;
  else if (lastModel === "foodsListForm") content = <FoodsListFormContent />;
  else if (lastModel === "filterFoodsForm")
    content = <FoodsFilterFormContent />;
  else if (lastModel === "nutrientsValues")
    content = <NutrientsValuesFormContent />;
  else if (lastModel === "foodDetails") content = <FoodDetails />;
  else content = <></>;

  return <ModelCard>{content}</ModelCard>;
}

export default ModelController;
