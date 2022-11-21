import React from "react";
import ModelMeetingContent from "../../../pages/SchedulePage/ModelMeetingContent/ModelMeetingContent";
import { useAppSelector } from "../../../redux/hooks";

import { getModelControllerState } from "../../../redux/slices/modelControllerSlice";
import ModelActivityFormContent from "../../Forms/ActivityForms/ModelActivityFormContent";
import ModelParticipantsGroupListFormContent from "../../Forms/ParticipantsGroupsListForms/ModelParticipantsGroupListFormContent";
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

  return <ModelCard>{content}</ModelCard>;
}

export default ModelController;
