import React from "react";
import style from "./MealsList.module.scss";
import List from "../../../../components/baseComponents/List/List";
import { MealDetails } from "../../../../redux/api/interfaceAPI";
import { genClassName } from "../../../../utilities/helpersFun";
import NutrientsDetails from "./NutrientsDetails/NutrientsDetails";

function MealsList({ meals }: { meals: MealDetails[] }) {
  const caloriesTotal = meals.reduce((pre, cur) => pre + cur.calories_total, 0);
  return (
    <>
      <h1>
        {`Total
        ${caloriesTotal}
        Kcal`}
      </h1>
      <p>Each meal has many suggestions of foods per nutrient.</p>
      <p>Please choose one food per nutrient.</p>
      <p> Each unit of nutrient is per 100g</p>
      <List
        className={genClassName(style.meals_list_container)}
        LI={({
          carbohydrates,
          proteins,
          fats,
          calories_total,
          index,
          ...data
        }) => (
          <li className={genClassName(style.meals_details_container)}>
            <h2>
              Meal {Number(index + 1)}, Total: {calories_total} Kcal
            </h2>
            <div className={genClassName(style.nutrients_details_container)}>
              <NutrientsDetails
                nutrientsFoods={proteins}
                nutrientCalories={data.protein_cals}
                nutrientName="Proteins"
              />
              <NutrientsDetails
                nutrientsFoods={fats}
                nutrientName="Fats"
                nutrientCalories={data.fat_cals}
              />
              <NutrientsDetails
                nutrientsFoods={carbohydrates}
                nutrientName="Carbohydrates"
                nutrientCalories={data.carbs_cals}
              />
            </div>
          </li>
        )}
        dataArr={meals}
      />
    </>
  );
}

export default MealsList;
