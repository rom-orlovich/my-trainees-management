import React from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from "../../../redux/hooks";
import { getApiSideEffect } from "../../../redux/slices/apiSideEffectSlice";
import { PropsBasic } from "../baseComponentsTypes";
const modelWarper = document.getElementById("model") as Element;
function Model(props: PropsBasic) {
  const apiSideEffectState = useAppSelector(getApiSideEffect);

  return apiSideEffectState.isModelOpen ? (
    createPortal(props.children, modelWarper)
  ) : (
    <></>
  );
}

export default Model;
