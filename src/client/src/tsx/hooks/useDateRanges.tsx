import React, { ChangeEventHandler, useEffect } from "react";
import { InputLabel } from "../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import useOnChangeInput from "./useOnChangeInput";

function useDateRanges() {
  const [datesRangeOptionState, onChange] = useOnChangeInput({
    gt: "",
    lt: "",
  });

  return { ...datesRangeOptionState, onChange };
}

export default useDateRanges;
