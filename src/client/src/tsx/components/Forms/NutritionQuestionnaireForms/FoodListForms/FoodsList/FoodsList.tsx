/* eslint-disable camelcase */
import React from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { genClassName } from "../../../../../utilities/helpersFun";
import List from "../../../../baseComponents/List/List";
import { FoodProps } from "../FoodsListForm";
import style from "./FoodsList.module.scss";

function FoodsList({
  foods,
  className,
}: {
  foods: (FoodProps & { id: string })[];
  className?: string;
}) {
  return (
    <List
      className={genClassName(style.foods_list_container, className)}
      dataArr={foods}
      LI={({ food_id, food_name, id }) => (
        <li>
          <p>
            {food_name.slice(0, 25)}
            <i>
              <TiDelete />
            </i>
          </p>
        </li>
      )}
    />
  );
}

export default FoodsList;
