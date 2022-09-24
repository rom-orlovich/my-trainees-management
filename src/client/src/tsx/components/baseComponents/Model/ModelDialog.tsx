import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Card from "../Card/Card";
import Model from "./Model";

function ModelDialog() {
  const isModelOpen = useAppSelector(
    (state) => state.apiSideEffect.isModelOpen
  );
  console.log(isModelOpen);
  const dispatch = useAppDispatch();
  return (
    isModelOpen && (
      <Model>
        <Card>ModelDialog</Card>
      </Model>
    )
  );
}

export default ModelDialog;
