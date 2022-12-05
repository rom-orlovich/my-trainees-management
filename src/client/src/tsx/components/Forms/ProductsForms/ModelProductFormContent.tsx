import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

import style from "../../baseComponents/Model/ModelFormContainer.module.scss";
import { ProductAddForm } from "./ProductAddForm";
import ProductEditForm from "./ProductEditForm";

function ModelProductFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>
      {id ? <ProductEditForm id={id} /> : <ProductAddForm />}
    </div>
  );
}

export default ModelProductFormContent;
