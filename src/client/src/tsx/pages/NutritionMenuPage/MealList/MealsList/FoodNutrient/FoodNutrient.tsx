import React from "react";
import { FoodNutrientDetails } from "../../../../../redux/api/interfaceAPI";
import { genClassName } from "../../../../../utilities/helpersFun";
import style from "./FoodNutrient.module.scss";

function FoodNutrient({
  foodNutrient: { food_name, food_amount },
}: {
  foodNutrient: FoodNutrientDetails;
}) {
  return (
    <li className={genClassName(style.food_nutrient_container)}>
      <span className={style.name}>
        {food_amount} unit, {food_name.slice(0, 20)} /
      </span>
    </li>
  );
}

export default FoodNutrient;
