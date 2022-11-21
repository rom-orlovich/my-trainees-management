import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlice";

import style from "../../baseComponents/Model/ModelFormContainer.module.scss";
import { MusclesGroupAddForm } from "./MusclesGroupAddForm";
import { MusclesGroupEditForm } from "./MusclesGroupEditForm";

function ModelMuscleGroupFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>
      {id ? <MusclesGroupEditForm id={id} /> : <MusclesGroupAddForm />}
    </div>
  );
}

export default ModelMuscleGroupFormContent;
