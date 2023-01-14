import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import {
  closeModel,
  getModelControllerState,
} from "../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { PropsBasic } from "../baseComponentsTypes";

function Model(props: PropsBasic) {
  const modelWarper = document.getElementById("model");
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(closeModel());
  }, [location.pathname]);
  const modelControllerSlice = useAppSelector(getModelControllerState);

  return modelWarper &&
    modelControllerSlice.isModelOpen &&
    modelControllerSlice.displayContent.length ? (
    createPortal(props.children, modelWarper)
  ) : (
    <></>
  );
}

export default Model;
