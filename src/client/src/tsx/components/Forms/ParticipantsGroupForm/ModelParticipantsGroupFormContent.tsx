import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

import style from "../../baseComponents/Model/ModelFormContainer.module.scss";
import { ParticipantsGroupAddForm } from "./ParticipantsGroupAddForm";
import { ParticipantsGroupEditForm } from "./ParticipantsGroupEditForm";

function ModelParticipantsGroupFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>
      {id ? (
        <ParticipantsGroupEditForm id={id} />
      ) : (
        <ParticipantsGroupAddForm />
      )}
    </div>
  );
}

export default ModelParticipantsGroupFormContent;
