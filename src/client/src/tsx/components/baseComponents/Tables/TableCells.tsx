import {
  DetailedHTMLProps,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

import {
  captialFirstLetter,
  checkIfStrIsValidDate,
} from "../../../utlities/helpersFun";

export interface ThProps {
  td?: Partial<
    DetailedHTMLProps<
      TdHTMLAttributes<HTMLTableCellElement>,
      HTMLTableCellElement
    >
  >;
  value: string;
}
export interface TdProps {
  td?: Partial<
    DetailedHTMLProps<
      ThHTMLAttributes<HTMLTableCellElement>,
      HTMLTableCellElement
    >
  >;
  value: string | number | boolean | ReactNode;
  fitTh?: string;
}

// Splits the name of the value by '_' , capital thier first letter,
// and return new formatted string.
export const formatThValue = (value: string) => {
  const splitArr = value.split("_");
  if (!splitArr[1]) return captialFirstLetter(value);
  return splitArr.map(captialFirstLetter).join(" ");
};

export function ThCell({ value, ...rest }: ThProps) {
  return <th {...rest}>{value as string}</th>;
}

export function TdCell({ value, td, fitTh }: TdProps) {
  let Value: string | number | ReactNode;
  let className = "";
  if (typeof value === "string") Value = checkIfStrIsValidDate(value);
  else if (typeof value === "boolean") {
    Value = value ? "Active" : "Unactive";
    className = value ? "active" : "unactive";
  } else Value = value;

  return (
    <td className={className} data-label={fitTh} {...td}>
      {Value}
    </td>
  );
}
