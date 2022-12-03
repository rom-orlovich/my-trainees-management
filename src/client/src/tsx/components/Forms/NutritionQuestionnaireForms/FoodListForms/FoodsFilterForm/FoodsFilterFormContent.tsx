import React from "react";

import style from "../../../../baseComponents/Model/ModelFormContainer.module.scss";
import { FoodsFilterAddForm } from "./FoodsFilterAddForm";

function FoodsFilterFormContent() {
  return (
    <div className={style.model_form_container}>{<FoodsFilterAddForm />}</div>
  );
}

export default FoodsFilterFormContent;
