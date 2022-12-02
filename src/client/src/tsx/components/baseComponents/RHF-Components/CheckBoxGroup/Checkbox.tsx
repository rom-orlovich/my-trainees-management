import React from "react";
import { InternalFieldName, UseFormRegisterReturn } from "react-hook-form";
import { genClassName } from "../../../../utilities/helpersFun";

import { InputLabel, InputProps, LabelProps } from "../InputLabel/InputLabel";

import style from "./CheckboxGroup.module.scss";

export interface CheckBox {
  InputProps?: InputProps;
  LabelProps: LabelProps;
  register?: UseFormRegisterReturn<InternalFieldName>;
}
function Checkbox({ InputProps, LabelProps, register }: CheckBox) {
  return (
    <InputLabel
      LabelProps={{
        ...LabelProps,
        className: genClassName(LabelProps?.className),
      }}
      InputProps={{
        ref: register?.ref,
        name: register?.name,
        onChange: register?.onChange,
        ...InputProps,
        type: "checkbox",
      }}
    />
  );
}

export default Checkbox;
