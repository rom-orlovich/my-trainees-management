import React from "react";
import { FoodNutrientDetails } from "../../../../redux/api/interfaceAPI";

function FoodNutrient({
  foodNutrient: { food_name },
}: {
  foodNutrient: FoodNutrientDetails;
}) {
  return <li>{food_name}</li>;
}

export default FoodNutrient;
