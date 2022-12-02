import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlice";

import style from "../../baseComponents/Model/ModelFormContainer.module.scss";
import { FoodListAddForm } from "./FoodFilterAddForm";

function FoodListFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>{<FoodListAddForm />}</div>
  );
}

export default FoodListFormContent;
