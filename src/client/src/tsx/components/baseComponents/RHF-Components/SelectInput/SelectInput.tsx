import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { genClassName } from "../../../../utilities/helpersFun";
import { PropsBasic } from "../../baseComponentsTypes";
import InputIcon, { InputIconProps } from "../InputIcon/InputIcon";
import { LabelProps } from "../InputLabel/InputLabel";

import style from "./SelectInput.module.scss";

export interface Option {
  label: React.ReactNode;
  value: string | number | string[];
}

interface SelectInputProps {
  selectProps: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
  LabelProps: LabelProps;
  inputIconProps?: InputIconProps;
  options: Option[];
}

export function SelectInput({
  selectProps: { ref, ...selectProps },
  LabelProps: { htmlFor, labelText, ...LabelProps },
  options,
  className,
  children,
  inputIconProps,
}: SelectInputProps & PropsBasic) {
  return (
    <label
      htmlFor={htmlFor}
      {...LabelProps}
      className={genClassName(
        className,
        style.selectInput_label,
        LabelProps.className
      )}
    >
      {labelText}
      <select ref={ref} id={htmlFor} name={htmlFor} {...selectProps}>
        {options.map(({ label, value }, i) => (
          <option key={`${label}+${value}${i}`} value={value}>
            {label}
          </option>
        ))}
      </select>
      {inputIconProps && <InputIcon {...inputIconProps} />}
      {children}
    </label>
  );
}
