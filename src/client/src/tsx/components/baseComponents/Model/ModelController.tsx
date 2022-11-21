import React from "react";
import ModelMeetingContent from "../../../pages/SchedulePage/ModelMeetingContent/ModelMeetingContent";
import ModelCard from "./ModelCard";

function ModelController() {
  let content = <></>;
  if (true) content = <ModelMeetingContent />;
  return <ModelCard>{content}</ModelCard>;
}

export default ModelController;
