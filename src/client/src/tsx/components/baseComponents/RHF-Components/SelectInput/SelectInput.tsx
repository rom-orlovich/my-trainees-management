import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { PropsBasic } from "../../baseComponentsTypes";

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
  LabelProps: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > & { labelText: string };
  addOption?: {
    link: string;
    saveState?: () => void;
  };
  options: Option[];
}

export function SelectInput({
  selectProps: { ref, ...selectProps },
  LabelProps: { htmlFor, labelText, ...LabelProps },
  options,
  children,
  addOption,
}: SelectInputProps & PropsBasic) {
  return (
    <span className={"selectInput_label"}>
      <label htmlFor={htmlFor} {...LabelProps}>
        {labelText}
      </label>
      <span className={style.select_plus_button}>
        <select ref={ref} id={htmlFor} {...selectProps}>
          {options.map(({ label, value }, i) => {
            return (
              <option key={`${label}+${value}${i}`} value={value}>
                {label}
              </option>
            );
          })}
        </select>
        {addOption ? (
          <Link to={addOption.link}>{<AiOutlinePlusCircle />} </Link>
        ) : (
          <> </>
        )}
      </span>
      {children}
    </span>
  );
}
