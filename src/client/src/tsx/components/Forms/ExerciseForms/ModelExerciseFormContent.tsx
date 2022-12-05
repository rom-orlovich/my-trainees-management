import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

import style from "../../baseComponents/Model/ModelFormContainer.module.scss";
import { ExerciseAddForm } from "./ExerciseAddForm";
import { ExerciseEditForm } from "./ExerciseEditForm";

function ModelExerciseFormContent() {
  const id = useAppSelector(getModelControllerState).curParam;

  return (
    <div className={style.model_form_container}>
      {id ? <ExerciseEditForm id={id} /> : <ExerciseAddForm />}
    </div>
  );
}

export default ModelExerciseFormContent;
