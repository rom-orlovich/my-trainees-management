/* eslint-disable camelcase */
import React from "react";
import { genClassName } from "../../../../utilities/helpersFun";
import List from "../../../baseComponents/List/List";
import { FoodProps } from "../FoodsListForm";
import style from "./FoodsList.module.scss";

function FoodsList({
  foods,
  className,
}: {
  foods: FoodProps[];
  className?: string;
}) {
  return (
    <List
      className={genClassName(style.foods_list_container, className)}
      dataArr={foods}
      LI={({ food_id, food_name }) => <li>{food_name.slice(0, 25)}</li>}
    />
  );
}

export default FoodsList;
