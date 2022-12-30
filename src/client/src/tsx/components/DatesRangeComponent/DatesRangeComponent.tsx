import { ChangeEventHandler } from "react";
import { InputLabel } from "../baseComponents/RHF-Components/InputLabel/InputLabel";

export default function DatesRangeComponent({
  className,
  inputsDateProps: { gt, lt, onChange },
}: {
  className?: string;
  inputsDateProps: {
    lt: string;
    gt: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
  };
}) {
  return (
    <span className={className}>
      <InputLabel
        LabelProps={{ labelText: "Date Start" }}
        InputProps={{
          type: "date",
          onChange,
          id: "gt",
          value: gt,
        }}
      />
      <InputLabel
        LabelProps={{ labelText: "Date End" }}
        InputProps={{
          type: "date",
          onChange,
          id: "lt",
          value: lt,
        }}
      />
    </span>
  );
}
