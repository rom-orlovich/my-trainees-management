import React from "react";
import { InternalFieldName, UseFormRegisterReturn } from "react-hook-form";
import { genClassName } from "../../../../utilities/helpersFun";

import { InputLabel, InputProps, LabelProps } from "../InputLabel/InputLabel";

import style from "./RadioButtonsGroup.module.scss";

export interface RadioButtonProps {
  InputProps?: InputProps;
  LabelProps: LabelProps;
  register?: UseFormRegisterReturn<InternalFieldName>;
}
function RadioButton({ InputProps, LabelProps, register }: RadioButtonProps) {
  return (
    <InputLabel
      LabelProps={{
        ...LabelProps,
        className: genClassName(LabelProps?.className),
      }}
      InputProps={{
        ...InputProps,
        ref: register?.ref,
        name: register?.name,
        onChange: register?.onChange,
        type: "radio",
      }}
    />
  );
}

export default RadioButton;
