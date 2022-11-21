import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import {
  closeModel,
  getModelControllerState,
} from "../../../redux/slices/modelControllerSlice";
import { PropsBasic } from "../baseComponentsTypes";

const modelWarper = document.getElementById("model") as Element;
function Model(props: PropsBasic) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(closeModel());
  }, [location.pathname]);
  const modelControllerSlice = useAppSelector(getModelControllerState);

  return modelControllerSlice.isModelOpen &&
    modelControllerSlice.displayContent.length ? (
    createPortal(props.children, modelWarper)
  ) : (
    <></>
  );
}

export default Model;
