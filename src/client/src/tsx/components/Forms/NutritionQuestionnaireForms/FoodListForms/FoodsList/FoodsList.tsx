/* eslint-disable camelcase */
import React from "react";
import { UseFieldArrayRemove } from "react-hook-form";

import { TiDelete } from "react-icons/ti";
import { useAppDispatch } from "../../../../../redux/hooks";
import { openModel } from "../../../../../redux/slices/modelControllerSlice";
import { genClassName } from "../../../../../utilities/helpersFun";
import List from "../../../../baseComponents/List/List";
import { FoodProps } from "../FoodsListForm";
import style from "./FoodsList.module.scss";

function FoodsList({
  foods,
  className,
  remove,
}: {
  foods: FoodProps[];
  className?: string;
  remove: UseFieldArrayRemove;
}) {
  const dispatch = useAppDispatch();
  return (
    <List
      className={genClassName(style.foods_list_container, className)}
      dataArr={foods}
      LI={({ food_id, food_name, index }) => (
        <li>
          <span
            onClick={() => {
              dispatch(
                openModel({
                  curParam: { food_id, amount: 1 },
                  displayContent: "foodDetails",
                })
              );
            }}
            className={style.name_food}
          >
            {food_name.slice(0, 25)}
          </span>

          <span onClick={() => remove(index)} className={style.delete_icon}>
            <TiDelete />
          </span>
        </li>
      )}
    />
  );
}

export default FoodsList;
