import React from "react";
import { createPortal } from "react-dom";
import { PropsBasic } from "../baseComponentsTypes";
const modelWarper = document.getElementById("model") as Element;
function Model(props: PropsBasic) {
  return createPortal(props.children, modelWarper);
}

export default Model;
