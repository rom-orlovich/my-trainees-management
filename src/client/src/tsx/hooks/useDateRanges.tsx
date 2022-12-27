import React from "react";
import { InputLabel } from "../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import useOnChangeInput from "./useOnChangeInput";

function useDateRanges() {
  const [datesRangeOptionState, onChangeDates] = useOnChangeInput({
    gt: "",
    lt: "",
  });
  const DateRangeComponent = ({ className }: { className?: string }) => (
    <span className={className}>
      <InputLabel
        LabelProps={{ labelText: "Date Start" }}
        InputProps={{
          type: "date",
          onChange: onChangeDates,
          id: "gt",
        }}
      />
      <InputLabel
        LabelProps={{ labelText: "Date End" }}
        InputProps={{ type: "date", onChange: onChangeDates, id: "lt" }}
      />
    </span>
  );

  return { DateRangeComponent, datesRangeOptionState };
}

export default useDateRanges;
