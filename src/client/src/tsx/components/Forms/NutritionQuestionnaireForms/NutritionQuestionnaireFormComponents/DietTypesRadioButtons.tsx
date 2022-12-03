import React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { DietTypes } from "../../../../redux/api/interfaceAPI";

import RadioButtonsGroup, {
  RadioButtonGroupProps,
} from "../../../baseComponents/RHF-Components/RadioButtonsGroup/RadioButtonsGroup";

interface DietTypesRadioButtonsProps {
  diet_type: DietTypes;
}

function DietTypesRadioButtons<T extends DietTypesRadioButtonsProps>({
  register,
  className,
}: {
  register: UseFormRegister<T>;
  className?: string;
}) {
  const radioButtonsGroupData: RadioButtonGroupProps = {
    radioButtonsDataArr: [
      {
        register: register("diet_type" as Path<T>),
        LabelProps: { labelText: "Neutral?" },
        InputProps: { value: "neutral" },
      },
      {
        register: register("diet_type" as Path<T>),
        LabelProps: { labelText: "Cutting?" },
        InputProps: { value: "cutting" },
      },
      {
        register: register("diet_type" as Path<T>),
        LabelProps: { labelText: "Bulking?" },
        InputProps: { value: "bulking" },
      },
    ],
  };

  return (
    <RadioButtonsGroup
      heading="Diet Types"
      className={className}
      radioButtonsDataArr={radioButtonsGroupData.radioButtonsDataArr}
    />
  );
}

export default DietTypesRadioButtons;
