import React from "react";
import { Path, UseFormRegister } from "react-hook-form";

import CheckBoxGroup, {
  CheckBoxGroupProps,
} from "../../../baseComponents/RHF-Components/CheckBoxGroup/CheckboxGroup";

interface FoodRulesCheckboxesProps {
  kosher?: boolean;
  is_vegan?: boolean;
  is_vegetarian?: boolean;
  is_keep_meat_milk?: boolean;
}

function FoodRulesCheckboxes<T extends FoodRulesCheckboxesProps>({
  register,
  className,
  keepMeatMeal = true,
}: {
  register: UseFormRegister<T>;
  className?: string;
  keepMeatMeal?: boolean;
}) {
  const checkboxGroupData: CheckBoxGroupProps = {
    checkboxDataArr: [
      {
        register: register("kosher" as Path<T>),
        LabelProps: { labelText: "Kosher?" },
      },

      {
        register: register("is_vegan" as Path<T>),
        LabelProps: { labelText: "Vegan?" },
      },
      {
        register: register("is_vegetarian" as Path<T>),
        LabelProps: { labelText: "Vegetarian?" },
      },
      {
        register: register("is_keep_meat_milk" as Path<T>),
        LabelProps: { labelText: "KeepMeat&Milk?" as Path<T> },
      },
    ],
  };

  return (
    <CheckBoxGroup
      heading="Food Rules"
      className={className}
      checkboxDataArr={
        keepMeatMeal
          ? checkboxGroupData.checkboxDataArr
          : checkboxGroupData.checkboxDataArr.slice(0, -1)
      }
    />
  );
}

export default FoodRulesCheckboxes;
