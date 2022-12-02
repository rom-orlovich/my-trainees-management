/* eslint-disable camelcase */
import React from "react";
import List from "../../baseComponents/List/List";
import { FoodFilterProps } from "./FoodListForm";

function FoodsList({ foods }: { foods: FoodFilterProps[] }) {
  return (
    <List
      dataArr={foods}
      LI={({ food_id, food_name }) => <li>{food_name}</li>}
    />
  );
}

export default FoodsList;
