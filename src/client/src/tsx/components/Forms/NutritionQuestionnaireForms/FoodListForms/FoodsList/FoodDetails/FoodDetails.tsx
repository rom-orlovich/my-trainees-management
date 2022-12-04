/* eslint-disable no-nested-ternary */
import React from "react";
import { useDispatch } from "react-redux";
import useGetUserLoginData from "../../../../../../hooks/useGetUserLoginData";
import { foodsApi } from "../../../../../../redux/api/hooksAPI";
import { useAppSelector } from "../../../../../../redux/hooks";
import {
  getModelControllerState,
  preModel,
} from "../../../../../../redux/slices/modelControllerSlice";
import style from "./FoodDetails.module.scss";

function FoodDetails() {
  const dispatch = useDispatch();
  const { curParam } = useAppSelector(getModelControllerState);
  const { user_id } = useGetUserLoginData();
  const { data } = foodsApi.useGetItemByIDQuery({
    id: curParam.food_id,
    userID: user_id,
  });

  return (
    <div className={style.food_details_container}>
      <h1> {data?.food_name} </h1>
      <span className={style.total_cal}>
        Total Calories: <b>{data?.calories_total}Kcal </b>
      </span>
      <div className={style.nutrients}>
        <span className={style.nutrient_details}>
          Proteins <b> {data?.protein_g}g</b>
        </span>

        <span className={style.nutrient_details}>
          Fats<b>{data?.fat_g}g </b>
        </span>
        <span className={style.nutrient_details}>
          Carbohydrates
          <b> {data?.carbs_g}g</b>
        </span>
      </div>

      <div className={style.nutrients}>
        <span className={style.nutrient_details}>
          Saturated Fat<b>{data?.saturated_fat}g </b>
        </span>
        <span className={style.nutrient_details}>
          Cholesterol <b> {data?.cholesterol_mg}mg</b>
        </span>
        <span className={style.nutrient_details}>
          Sugars
          <b> {data?.sugars_g}g</b>
        </span>
        <span className={style.nutrient_details}>
          Sodium
          <b> {data?.sodium_mg}mg</b>
        </span>
      </div>

      <div className={style.nutrients}>
        <span className={style.nutrient_details}>
          <b> {data?.kosher_type}</b>
        </span>
        <span className={style.nutrient_details}>
          Kosher? <b>{data?.kosher ? "Yes" : "No"} </b>
        </span>
        <span className={style.nutrient_details}>
          <b>
            {data?.is_vegan
              ? " Vegan"
              : data?.is_vegetarian
              ? "Vegetarian"
              : "Meat"}
          </b>
        </span>
      </div>
      <button
        className={style.button_submit}
        onClick={() => dispatch(preModel())}
      >
        Submit
      </button>
    </div>
  );
}

export default FoodDetails;
