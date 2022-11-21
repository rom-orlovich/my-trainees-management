import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlice";

import style from "../../baseComponents/Model/ModelFormContainer.module.scss";
import SubscriptionPlansAddForm from "./SubscriptionPlansAddForm";
import SubscriptionPlansEditForm from "./SubscriptionPlansEditForm";

function ModelSubscriptionPlansFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>
      {id ? (
        <SubscriptionPlansEditForm id={id} />
      ) : (
        <SubscriptionPlansAddForm />
      )}
    </div>
  );
}

export default ModelSubscriptionPlansFormContent;
