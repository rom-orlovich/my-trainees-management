import React from "react";
import ModelMeetingContent from "../../../pages/SchedulePage/ModelMeetingContent/ModelMeetingContent";
import { useAppSelector } from "../../../redux/hooks";

import { getModelControllerState } from "../../../redux/slices/modelControllerSlice";
import ModelActivityFormContent from "../../Forms/ActivityForms/ModelActivityFormContent";
import ModelCityFormContent from "../../Forms/CityForms/ModelCityFormContent";
import ModelEquipmentFormContent from "../../Forms/EquipmentForms/ModelEquipmentFormContent";
import ModelExerciseFormContent from "../../Forms/ExerciseForms/ModelExerciseFormContent";
import ModelLocationFormContent from "../../Forms/LocationForms/ModelLocationFormContent";
import ModelMuscleGroupFormContent from "../../Forms/MusclesGroupForms/ModelMuscleGroupFormContent";
import ModelParticipantsGroupListFormContent from "../../Forms/ParticipantsGroupsListForms/ModelParticipantsGroupListFormContent";
import ModelProductFormContent from "../../Forms/ProductsForms/ModelProductFormContent";
import ModelCard from "./ModelCard";

function ModelController() {
  const modelControllerState = useAppSelector(getModelControllerState);
  let content = <></>;
  if (modelControllerState.lastModel === "meeting")
    content = <ModelMeetingContent />;

  if (modelControllerState.lastModel === "participantsGroupsListForm")
    content = <ModelParticipantsGroupListFormContent />;
  if (modelControllerState?.lastModel === "activityForm")
    content = <ModelActivityFormContent />;
  if (modelControllerState?.lastModel === "locationForm")
    content = <ModelLocationFormContent />;
  if (modelControllerState?.lastModel === "cityForm")
    content = <ModelCityFormContent />;
  if (modelControllerState?.lastModel === "productForm")
    content = <ModelProductFormContent />;
  if (modelControllerState?.lastModel === "exerciseForm")
    content = <ModelExerciseFormContent />;
  if (modelControllerState?.lastModel === "muscleGroupForm")
    content = <ModelMuscleGroupFormContent />;
  if (modelControllerState?.lastModel === "equipmentForm")
    content = <ModelEquipmentFormContent />;

  return <ModelCard>{content}</ModelCard>;
}

export default ModelController;
