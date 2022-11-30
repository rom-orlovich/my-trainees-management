import React from "react";
import List from "../../../../../components/baseComponents/List/List";
import { FoodNutrientDetails } from "../../../../../redux/api/interfaceAPI";
import { genClassName } from "../../../../../utilities/helpersFun";
import FoodNutrient from "../FoodNutrient/FoodNutrient";
import style from "./NutrientsDetails.module.scss";

function NutrientsDetails({
  nutrientsFoods,
  nutrientName,
  nutrientCalories,
}: {
  nutrientName: string;
  nutrientsFoods: FoodNutrientDetails[];
  nutrientCalories: number;
}) {
  return (
    <div className={genClassName(style.nutrient_details_container)}>
      <h3>{nutrientName}:</h3>

      <List
        LI={(data) => (
          <>
            <FoodNutrient foodNutrient={data} />
          </>
        )}
        dataArr={nutrientsFoods}
      />
      <div>
        <b>
          {`Meal's ${nutrientName.toLocaleLowerCase()} ${nutrientCalories} Kcal`}
        </b>
      </div>
    </div>
  );
}

export default NutrientsDetails;
