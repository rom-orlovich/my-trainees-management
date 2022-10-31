import React from "react";
import { useSearchParams } from "react-router-dom";
import ModelCard from "../../../components/baseComponents/Model/ModelCard";
import { MeetingAddForm } from "../../../components/Forms/MeetingForms/MeetingAddForm";
import { MeetingEditForm } from "../../../components/Forms/MeetingForms/MeetingEditForm";

import { useAppSelector } from "../../../redux/hooks";

import { genClassName } from "../../../utilities/helpersFun";
import style from "./ModelMeeting.module.scss";

function ModelMeeting() {
  const [queryParams, setQueryParams] = useSearchParams();

  const id = Number(queryParams.get("id"));

  return (
    <ModelCard className={genClassName(style.form_card_model_container)}>
      {queryParams.get("modelFormState") === "edit" ? (
        <MeetingEditForm id={id} />
      ) : (
        <MeetingAddForm />
      )}
    </ModelCard>
  );
}

export default ModelMeeting;
