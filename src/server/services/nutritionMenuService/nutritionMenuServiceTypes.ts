/* eslint-disable no-unused-vars */
import { Food } from "../foodsDataScraperService/foodsDataScraperServiceTypes";

export interface NutritionMenu {
  nutrition_menu_id?: number;
  date_start: Date;
  date_end?: Date;
  note_topic: string;
  note_text: string;
  profile_id: number;
  user_id: number;
}
export interface Meal {
  meal_id?: number;
  note_topic: string;
  note_text: string;
  user_id: number;
}

export type DietTypes = "cutting" | "bulking" | "neutral";
export interface FoodProps {
  id?: string;
  food_id: number;
  food_name: string;
}
export interface NutritionQuestionnaire {
  nutrition_questionnaire_id?: number;
  day_start: string;
  day_end: string;
  allergens: string[];
  black_list_foods: FoodProps[];
  favorite_foods: FoodProps[];
  kosher?: boolean;
  is_vegan?: boolean;
  is_vegetarian?: boolean;
  is_keep_meat_milk?: boolean;
  diet_type: DietTypes;
  meals_calories_size_percents: number[];
  profile_id: number;
  user_id: number;
}

export interface MealNutrientsCals {
  mealProteinsTotalCals: number;
  mealFatsTotalCals: number;
  mealCarbsTotalCals: number;
  mealTotalCals: number;
}
export type NutrientCalsType = "protein_cals" | "carbs_cals" | "fat_cals";

export interface MealFood {
  meal_id?: number;
  food_id?: number;

  amount: number;
}
export interface NutritionMenusMeals {
  nutrition_menu_id?: number;
  calories_total: number;
  protein_cals: number;
  carbs_cals: number;
  fat_cals: number;
  meal_id?: number;
}

export interface KeepMeatAndMilkObj {
  meatIllegal: boolean;
  dairyIllegal: boolean;
  proteinIllegalCount: number;
  fatsIllegalCount: number;
  carbsIllegalCount: number;
}

export interface ChosenFoodsNutrientsArrObj {
  proteinsChosenFoods: Food[];
  carbsChosenFoods: Food[];
  fatsChosenFoods: Food[];
}
export interface MealNutrientsFoodsObj {
  proteinsFoods: MealFood[];
  fatsFoods: MealFood[];
  carbsFoods: MealFood[];
}

export type CreateMealFoodByNutrientWithMealIDFun = (
  nutrientFoodsArr: Food[],
  nutrientTypeCalsKey: NutrientCalsType,
  mealNutrientsCals: number,
  totalCals: number
) => MealFood[];
