import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

import style from "../../baseComponents/Model/ModelFormContainer.module.scss";
import { EquipmentAddForm } from "./EquipmentAddForm";
import { EquipmentEditForm } from "./EquipmentEditForm";

function ModelEquipmentFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>
      {id ? <EquipmentEditForm id={id} /> : <EquipmentAddForm />}
    </div>
  );
}

export default ModelEquipmentFormContent;
