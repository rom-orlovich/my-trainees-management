import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { genClassName } from "../../../utilities/helpersFun";
import Card from "../Card/Card";
import Model from "./Model";
import style from "./ModelDialog.module.scss";
function ModelDialog() {
  const isModelOpen = useAppSelector(
    (state) => state.apiSideEffect.isModelOpen
  );
  console.log(isModelOpen);
  const dispatch = useAppDispatch();
  return isModelOpen ? (
    <Model>
      <div id={style.backdrop}> </div>
      <Card className={genClassName(style.model_card)}>ModelDialog</Card>
    </Model>
  ) : (
    <></>
  );
}

export default ModelDialog;
