import React from "react";
import { genClassName } from "../../../../utilities/helpersFun";
import { InputLabel } from "../InputLabel/InputLabel";
import style from "./CheckboxGroup.module.scss";

interface CheckboxLabelProps {
  InputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { isError?: boolean };
  LabelProps: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > & { labelText: string };
  children?: React.ReactNode;
}

function Checkbox({ InputProps, LabelProps }: CheckboxLabelProps) {
  return (
    <InputLabel
      LabelProps={{
        ...LabelProps,
        className: genClassName(style.checkbox_label, LabelProps.className),
      }}
      InputProps={{ ...InputProps, type: "checkbox" }}
    />
  );
}

export default Checkbox;
