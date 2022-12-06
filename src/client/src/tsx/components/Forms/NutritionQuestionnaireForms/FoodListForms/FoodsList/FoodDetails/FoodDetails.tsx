/* eslint-disable no-nested-ternary */
import React from "react";
import { useDispatch } from "react-redux";
import useGetUserLoginData from "../../../../../../hooks/useGetUserLoginData";
import { FoodDetailsModelParam } from "../../../../../../pages/NutritionMenuPage/MealList/MealsList/FoodNutrient/FoodNutrient";
import { foodsApi } from "../../../../../../redux/api/hooksAPI";
import { useAppSelector } from "../../../../../../redux/hooks";
import {
  getModelControllerState,
  preModel,
} from "../../../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import LoadingSpinner from "../../../../../baseComponents/LoadingSpinner/LoadingSpinner";
import style from "./FoodDetails.module.scss";
import { fixNum } from "../../../../../../utilities/helpersFun";

function FoodDetails() {
  const dispatch = useDispatch();
  let { curParam } = useAppSelector(getModelControllerState);
  const { user_id } = useGetUserLoginData();
  const { data, isError, isLoading, isFetching } = foodsApi.useGetItemByIDQuery(
    {
      id: curParam.food_id,
      userID: user_id,
    }
  );
  curParam = curParam as FoodDetailsModelParam;

  return (
    <LoadingSpinner stateData={{ data, isError, isLoading, isFetching }}>
      {(data) => (
        <div className={style.food_details_container}>
          <h1> {data?.food_name} </h1>
          <span className={style.total_cal}>
            Total Calories:
            <b>{fixNum(data?.calories_total * curParam.amount)}Kcal </b>
          </span>
          <span className={style.amount}>
            Amount:
            <b>
              {` ${curParam.amount}`} {curParam.amount > 1 ? " units" : " unit"}
            </b>
          </span>
          <div className={style.nutrients}>
            <span className={style.nutrient_details}>
              Proteins <b> {fixNum(data?.protein_g * curParam.amount)}g</b>
            </span>

            <span className={style.nutrient_details}>
              Fats<b>{fixNum(data?.fat_g * curParam.amount)}g </b>
            </span>
            <span className={style.nutrient_details}>
              Carbohydrates
              <b> {fixNum(data?.carbs_g * curParam.amount)}g</b>
            </span>
          </div>

          <div className={style.nutrients}>
            <span className={style.nutrient_details}>
              Saturated Fat
              <b>{fixNum(data?.saturated_fat * curParam.amount)}g </b>
            </span>
            <span className={style.nutrient_details}>
              Cholesterol{" "}
              <b> {fixNum(data?.cholesterol_mg * curParam.amount)}mg</b>
            </span>
            <span className={style.nutrient_details}>
              Sugars
              <b> {fixNum(data?.sugars_g * curParam.amount)}g</b>
            </span>
            <span className={style.nutrient_details}>
              Sodium
              <b> {fixNum(data?.sodium_mg * curParam.amount)}mg</b>
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
      )}
    </LoadingSpinner>
  );
}

export default FoodDetails;
