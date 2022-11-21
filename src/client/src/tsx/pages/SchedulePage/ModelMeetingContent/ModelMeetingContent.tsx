import React from "react";
import { useSearchParams } from "react-router-dom";
import ModelCard from "../../../components/baseComponents/Model/ModelCard";
import { MeetingAddForm } from "../../../components/Forms/MeetingForms/MeetingAddForm";
import { MeetingEditForm } from "../../../components/Forms/MeetingForms/MeetingEditForm";
import useCheckRole from "../../../hooks/useCheckRole";

import { genClassName } from "../../../utilities/helpersFun";
import ModelMeetingDetails from "../ModelMeetingDetails/ModelMeetingDetails";
import style from "./ModelMeeting.module.scss";

function ModelMeeting() {
  const [queryParams, setQueryParams] = useSearchParams();

  const meetingID = Number(queryParams.get("meetingID"));
  const ModelMeetingDetailsContent = (
    <ModelMeetingDetails meetingID={meetingID} />
  );
  const formMeetingContent =
    queryParams.get("modelFormState") === "edit" ? (
      <MeetingEditForm meetingID={meetingID} />
    ) : (
      <MeetingAddForm />
    );
  const { isTrainee } = useCheckRole();
  const modelContent = !isTrainee
    ? formMeetingContent
    : ModelMeetingDetailsContent;

  return (
    <ModelCard>
      <div className={genClassName(style.meeting_model_container)}>
        {modelContent}
      </div>
    </ModelCard>
  );
}

export default ModelMeeting;
