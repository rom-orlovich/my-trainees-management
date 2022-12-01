import React from "react";
import { genClassName } from "../../../../utilities/helpersFun";
import { LiProps } from "../../baseComponentsTypes";
import { InputLabel, InputProps, LabelProps } from "../InputLabel/InputLabel";

import style from "./CheckboxGroup.module.scss";

export interface CheckBox {
  label: string;
  id: string;
  InputProps?: InputProps;
  LabelProps: LabelProps;
}
function Checkbox({
  InputProps,
  LabelProps,
}: CheckBox & { liProps?: LiProps; index: number }) {
  return (
    <InputLabel
      LabelProps={{
        ...LabelProps,
        className: genClassName(style.checkbox_label, LabelProps?.className),
      }}
      InputProps={{ ...InputProps, type: "checkbox" }}
    />
  );
}

export default Checkbox;
