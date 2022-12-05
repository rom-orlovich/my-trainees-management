import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

import style from "../../baseComponents/Model/ModelFormContainer.module.scss";
import { CityAddForm } from "./CityAddForm";
import { CityEditForm } from "./CityEditForm";

function ModelCityFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>
      {id ? <CityEditForm id={id} /> : <CityAddForm />}
    </div>
  );
}

export default ModelCityFormContent;
