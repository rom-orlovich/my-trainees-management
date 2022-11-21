import React from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from "../../../redux/hooks";

import { getModelControllerState } from "../../../redux/slices/modelControllerSlice";
import { PropsBasic } from "../baseComponentsTypes";

const modelWarper = document.getElementById("model") as Element;
function Model(props: PropsBasic) {
  const modelControllerSlice = useAppSelector(getModelControllerState);

  return modelControllerSlice.isModelOpen ? (
    createPortal(props.children, modelWarper)
  ) : (
    <></>
  );
}

export default Model;
