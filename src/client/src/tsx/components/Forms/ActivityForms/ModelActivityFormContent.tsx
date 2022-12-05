import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

import style from "../../baseComponents/Model/ModelFormContainer.module.scss";
import { ActivityAddForm } from "./ActivityAddForm";
import { ActivityEditForm } from "./ActivityEditForm";

function ModelActivityFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>
      {id ? <ActivityEditForm id={id} /> : <ActivityAddForm />}
    </div>
  );
}

export default ModelActivityFormContent;
