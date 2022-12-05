/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";

import { useAppSelector } from "../../../redux/hooks";
import { getModelControllerState } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { GenericRecord } from "../../../types";
import style from "./ModelFormContainer.module.scss";

function ModelFormContainer<
  AFP extends GenericRecord<any>,
  EFP extends GenericRecord<any>
>({
  AddForm,
  EditForm,
}: {
  AddForm: (props: any & AFP) => JSX.Element;
  EditForm?: (id: any & EFP) => JSX.Element;
}) {
  let id;
  if (EditForm) id = useAppSelector(getModelControllerState).curParam;
  return (
    <div className={style.model_form_container}>
      {id ? EditForm && <EditForm id={id} /> : <AddForm />}
    </div>
  );
}

export default ModelFormContainer;
