import React from "react";
import { InputLabel, InputProps, LabelProps } from "../InputLabel/InputLabel";
import style from "./CheckboxGroup.module.scss";

export interface CheckBox {
  label: string;
  id: string;
  inputProps?: InputProps;
  labelProps?: LabelProps;
}
export interface CheckBoxGroupProps {
  checkboxDataArr: CheckBox[];
}

function CheckBoxGroup({ checkboxDataArr }: CheckBoxGroupProps) {
  return <>{checkboxDataArr.map((checkboxData) => {})} </>;
}

export default CheckBoxGroup;
