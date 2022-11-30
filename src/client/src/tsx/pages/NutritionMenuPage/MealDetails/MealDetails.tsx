import React from "react";
import List from "../../../components/baseComponents/List/List";
import { MealDetails } from "../../../redux/api/interfaceAPI";
import NutrientsDetails from "./NutrientsDetails/NutrientsDetails";

function MealsDetails({ meals }: { meals: MealDetails[] }) {
  return (
    <List
      LI={({ carbohydrates, proteins, fats, index, ...data }) => {
        console.log(data);
        return (
          <>
            <h1> Meal {Number(index || 0 + 1)} </h1>
            <NutrientsDetails
              nutrientsFoods={proteins}
              nutrientName="proteins"
            />
            <NutrientsDetails nutrientsFoods={fats} nutrientName="fats" />
            <NutrientsDetails
              nutrientsFoods={carbohydrates}
              nutrientName="carbohydrates"
            />
          </>
        );
      }}
      dataArr={meals}
    >
      MealDetails
    </List>
  );
}

export default MealsDetails;
