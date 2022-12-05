import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

import style from "../../baseComponents/Model/ModelFormContainer.module.scss";
import { LocationAddForm } from "./LocationAddForm";
import { LocationEditForm } from "./LocationEditForm";

function ModelLocationFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>
      {id ? <LocationEditForm id={id} /> : <LocationAddForm />}
    </div>
  );
}

export default ModelLocationFormContent;
