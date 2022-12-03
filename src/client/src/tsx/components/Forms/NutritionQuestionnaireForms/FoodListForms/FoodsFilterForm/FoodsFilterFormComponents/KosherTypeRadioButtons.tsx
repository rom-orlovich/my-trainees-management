import React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { KosherType } from "../../../../../../redux/api/interfaceAPI";

import RadioButtonsGroup, {
  RadioButtonGroupProps,
} from "../../../../../baseComponents/RHF-Components/RadioButtonsGroup/RadioButtonsGroup";

interface NutrientTypeRadioButtonsProps {
  kosher_type: KosherType | "all";
}

function KosherTypeRadioButtons<T extends NutrientTypeRadioButtonsProps>({
  register,
  className,
}: {
  register: UseFormRegister<T>;
  className?: string;
}) {
  const radioButtonsGroupData: RadioButtonGroupProps = {
    radioButtonsDataArr: [
      {
        register: register("kosher_type" as Path<T>, { required: true }),
        LabelProps: { labelText: "All" },
        InputProps: { value: "all" },
      },
      {
        register: register("kosher_type" as Path<T>),
        LabelProps: { labelText: "Parve?" },
        InputProps: { value: "פרווה" },
      },
      {
        register: register("kosher_type" as Path<T>),
        LabelProps: { labelText: "Meat?" },
        InputProps: { value: "בשרי" },
      },
      {
        register: register("kosher_type" as Path<T>),
        LabelProps: { labelText: "Dairy?" },
        InputProps: { value: "חלבי" },
      },
    ],
  };

  return (
    <RadioButtonsGroup
      heading="Select Kosher Type"
      className={className}
      radioButtonsDataArr={radioButtonsGroupData.radioButtonsDataArr}
    />
  );
}

export default KosherTypeRadioButtons;
