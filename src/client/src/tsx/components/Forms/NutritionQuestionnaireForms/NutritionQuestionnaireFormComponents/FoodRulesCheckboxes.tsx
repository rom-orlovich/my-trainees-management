import React from "react";
import { Path, UseFormRegister } from "react-hook-form";

import CheckBoxGroup, {
  CheckBoxGroupProps,
} from "../../../baseComponents/RHF-Components/CheckBoxGroup/CheckboxGroup";

interface FoodRulesCheckboxesProps {
  kosher: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  isKeepMeatMilk: boolean;
}

function FoodRulesCheckboxes<T extends FoodRulesCheckboxesProps>({
  register,
  className,
}: {
  register: UseFormRegister<T>;
  className?: string;
}) {
  const checkboxGroupData: CheckBoxGroupProps = {
    checkboxDataArr: [
      {
        register: register("kosher" as Path<T>),
        LabelProps: { labelText: "Kosher?" },
      },
      {
        register: register("isKeepMeatMilk" as Path<T>),
        LabelProps: { labelText: "KeepMeat&Milk?" as Path<T> },
      },
      {
        register: register("is_vegan" as Path<T>),
        LabelProps: { labelText: "Vegan?" },
      },
      {
        register: register("is_vegetarian" as Path<T>),
        LabelProps: { labelText: "Vegetarian?" },
      },
    ],
  };

  return (
    <CheckBoxGroup
      heading="Food Rules"
      className={className}
      checkboxDataArr={checkboxGroupData.checkboxDataArr}
    />
  );
}

export default FoodRulesCheckboxes;
