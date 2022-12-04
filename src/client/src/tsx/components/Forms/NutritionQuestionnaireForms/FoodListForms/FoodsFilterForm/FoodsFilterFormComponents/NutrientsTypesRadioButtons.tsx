import React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { NutrientsTypes } from "../../../../../../redux/api/interfaceAPI";

import RadioButtonsGroup, {
  RadioButtonGroupProps,
} from "../../../../../baseComponents/RHF-Components/RadioButtonsGroup/RadioButtonsGroup";

interface NutrientTypeRadioButtonsProps {
  nutrient_type?: NutrientsTypes | "all";
}

function NutrientsTypesRadioButtons<T extends NutrientTypeRadioButtonsProps>({
  register,
  className,
}: {
  register: UseFormRegister<T>;
  className?: string;
}) {
  const radioButtonsGroupData: RadioButtonGroupProps = {
    radioButtonsDataArr: [
      {
        register: register("nutrient_type" as Path<T>, { required: true }),
        LabelProps: { labelText: "All" },
        InputProps: { value: "all" },
      },
      {
        register: register("nutrient_type" as Path<T>),
        LabelProps: { labelText: "Proteins" },
        InputProps: { value: "proteins" },
      },
      {
        register: register("nutrient_type" as Path<T>),
        LabelProps: { labelText: "Fats" },
        InputProps: { value: "fats" },
      },
      {
        register: register("nutrient_type" as Path<T>),
        LabelProps: { labelText: "Carbohydrates" },
        InputProps: { value: "carbohydrates" },
      },
    ],
  };

  return (
    <RadioButtonsGroup
      heading="Select Nutrient Type"
      className={className}
      radioButtonsDataArr={radioButtonsGroupData.radioButtonsDataArr}
    />
  );
}

export default NutrientsTypesRadioButtons;
