import React from "react";
import { InputLabel, InputProps, LabelProps } from "../InputLabel/InputLabel";

export interface CheckBox {
  label: string;
  id: string;
  inputProps?: InputProps;
  labelProps?: LabelProps;
}
export interface CheckBoxGroupProps {
  checkboxDataArr: CheckBox[];
}

export function CheckBox({ label, labelProps, ...inputProps }: CheckBox) {
  return (
    <InputLabel
      LabelProps={{ ...labelProps, labelText: label }}
      InputProps={{ ...inputProps, type: "checkbox" }}
    />
  );
}

function CheckBoxGroup({ checkboxDataArr }: CheckBoxGroupProps) {
  return <>{checkboxDataArr.map((checkboxData) => {})} </>;
}

export default CheckBoxGroup;
