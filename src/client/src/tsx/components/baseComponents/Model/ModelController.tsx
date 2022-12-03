import React from "react";
import ModelMeetingContent from "../../../pages/SchedulePage/ModelMeetingContent/ModelMeetingContent";
import { useAppSelector } from "../../../redux/hooks";

import { getModelControllerState } from "../../../redux/slices/modelControllerSlice";
import ModelActivityFormContent from "../../Forms/ActivityForms/ModelActivityFormContent";
import AllergensFormContent from "../../Forms/AllergensForm/AllergensFormContent";
import ModelCityFormContent from "../../Forms/CityForms/ModelCityFormContent";
import ModelEquipmentFormContent from "../../Forms/EquipmentForms/ModelEquipmentFormContent";
import ModelExerciseFormContent from "../../Forms/ExerciseForms/ModelExerciseFormContent";
import FoodsFilterFormContent from "../../Forms/FoodListForms/FoodsFilterForm/FoodsFilterFormContent";
import FoodsListFormContent from "../../Forms/FoodListForms/FoodsListFormContent";

import ModelLocationFormContent from "../../Forms/LocationForms/ModelLocationFormContent";
import MealsCaloriesSizeFormContent from "../../Forms/MealsCaloriesSizeForms/MealsCaloriesSizeFormContent";

import ModelMuscleGroupFormContent from "../../Forms/MusclesGroupForms/ModelMuscleGroupFormContent";
import ModelParticipantsGroupFormContent from "../../Forms/ParticipantsGroupForm/ModelParticipantsGroupFormContent";
import ModelParticipantsGroupListFormContent from "../../Forms/ParticipantsGroupsListForms/ModelParticipantsGroupListFormContent";
import ModelProductFormContent from "../../Forms/ProductsForms/ModelProductFormContent";
import ModelSubscriptionPlansFormContent from "../../Forms/SubscriptionPlansForms/ModelSubscriptionPlansFormContent";
import ModelCard from "./ModelCard";

function ModelController() {
  const modelControllerState = useAppSelector(getModelControllerState);
  let content = <></>;
  if (modelControllerState.lastModel === "meeting")
    content = <ModelMeetingContent />;
  else if (modelControllerState.lastModel === "participantsGroupsListForm")
    content = <ModelParticipantsGroupListFormContent />;
  else if (modelControllerState.lastModel === "participantForm")
    content = <ModelParticipantsGroupFormContent />;
  else if (modelControllerState?.lastModel === "activityForm")
    content = <ModelActivityFormContent />;
  else if (modelControllerState?.lastModel === "locationForm")
    content = <ModelLocationFormContent />;
  else if (modelControllerState?.lastModel === "cityForm")
    content = <ModelCityFormContent />;
  else if (modelControllerState?.lastModel === "productForm")
    content = <ModelProductFormContent />;
  else if (modelControllerState?.lastModel === "exerciseForm")
    content = <ModelExerciseFormContent />;
  else if (modelControllerState?.lastModel === "muscleGroupForm")
    content = <ModelMuscleGroupFormContent />;
  else if (modelControllerState?.lastModel === "equipmentForm")
    content = <ModelEquipmentFormContent />;
  else if (modelControllerState?.lastModel === "subscriptionPlansForm")
    content = <ModelSubscriptionPlansFormContent />;
  else if (modelControllerState?.lastModel === "mealsDistPercents")
    content = <MealsCaloriesSizeFormContent />;
  else if (modelControllerState?.lastModel === "allergensList")
    content = <AllergensFormContent />;
  else if (modelControllerState?.lastModel === "favoriteFoods")
    content = <FoodsListFormContent />;
  else if (modelControllerState?.lastModel === "filterFoodForm")
    content = <FoodsFilterFormContent />;
  else content = <></>;

  return <ModelCard>{content}</ModelCard>;
}

export default ModelController;
