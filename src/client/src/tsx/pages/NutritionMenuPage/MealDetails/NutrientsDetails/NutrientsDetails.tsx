import React from "react";
import List from "../../../../components/baseComponents/List/List";
import { FoodNutrientDetails } from "../../../../redux/api/interfaceAPI";
import FoodNutrient from "../FoodNutrient/FoodNutrient";

function NutrientsDetails({
  nutrientsFoods,
  nutrientName,
}: {
  nutrientName: string;
  nutrientsFoods: FoodNutrientDetails[];
}) {
  return (
    <>
      <h1>{nutrientName} </h1>
      <List
        LI={(data) => (
          <>
            <FoodNutrient foodNutrient={data} />
          </>
        )}
        dataArr={nutrientsFoods}
      />
    </>
  );
}

export default NutrientsDetails;
