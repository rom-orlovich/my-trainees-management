import {
  DetailedHTMLProps,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

import {
  capitalFirstLetter,
  checkIfStrIsValidDate,
} from "../../../utilities/helpersFun";

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

// Splits the name of the value by '_' , capital their first letter,
// and return new formatted string.
export const formatThValue = (value: string) => {
  const splitArr = value.split("_");
  if (!splitArr[1]) return capitalFirstLetter(value);
  return splitArr.map(capitalFirstLetter).join(" ");
};

export function ThCell({ value, ...rest }: ThProps) {
  return <th {...rest}>{value as string}</th>;
}

export function TdCell({ value, td, fitTh }: TdProps) {
  let Value: string | number | ReactNode;
  let className = "";
  if (typeof value === "string") Value = checkIfStrIsValidDate(value);
  else if (typeof value === "boolean") {
    Value = value ? "Active" : "Inactive";
    className = value ? "active" : "inactive";
  } else Value = value;

  return (
    <td className={className} data-label={fitTh} {...td}>
      {Value}
    </td>
  );
}
