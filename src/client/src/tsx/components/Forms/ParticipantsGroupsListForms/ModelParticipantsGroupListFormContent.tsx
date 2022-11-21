import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlice";

import { ParticipantsGroupsListAddForm } from "./ParticipantsGroupsListAddForm";
import { ParticipantsGroupsListEditForm } from "./ParticipantsGroupsListEditForm.tsx";
import style from "../../baseComponents/Model/ModelFormContainer.module.scss";

function ModelParticipantsGroupListFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>
      {id ? (
        <ParticipantsGroupsListEditForm id={id} />
      ) : (
        <ParticipantsGroupsListAddForm />
      )}
    </div>
  );
}

export default ModelParticipantsGroupListFormContent;
