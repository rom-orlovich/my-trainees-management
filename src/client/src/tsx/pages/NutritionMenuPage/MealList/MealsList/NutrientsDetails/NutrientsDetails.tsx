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
  const numG = (
    nutrientName === "Fats" ? nutrientCalories / 9 : nutrientCalories / 4
  ).toFixed(2);
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

      <b>{`Up to ${nutrientCalories}Kcal/${numG}g ${nutrientName.toLocaleLowerCase()}`}</b>
    </div>
  );
}

export default NutrientsDetails;
