import React from "react";

import style from "../../../../../baseComponents/Model/ModelFormContainer.module.scss";
import { NutrientsValuesAddForm } from "./NutrientsValuesAddForm";

function NutrientsValuesFormContent() {
  return (
    <div className={style.model_form_container}>
      {<NutrientsValuesAddForm />}
    </div>
  );
}

export default NutrientsValuesFormContent;
