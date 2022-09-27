import React from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from "../../../redux/hooks";
import { PropsBasic } from "../baseComponentsTypes";
const modelWarper = document.getElementById("model") as Element;
function Model(props: PropsBasic) {
  const isModelOpen = useAppSelector(
    (state) => state.apiSideEffect.isModelOpen
  );

  return isModelOpen ? createPortal(props.children, modelWarper) : <></>;
}

export default Model;
