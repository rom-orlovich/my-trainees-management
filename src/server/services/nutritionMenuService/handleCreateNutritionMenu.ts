import { RequestHandler } from "express";
import { newDate } from "../../utilities/helpers";
import { createNutritionMenu } from "./createNutritionMenu";
import { NutritionQuestionnaire } from "./types";

export const nutritionQuestionnaires: NutritionQuestionnaire = {
  user_id: 2,
  allergens: [],
  black_list_foods: [],
  favorite_foods: [344],
  kosher: true,
  isKeepMeatMilk: true,
  is_vegan: false,
  is_vegetarian: false,
  profile_id: 3,
  day_start: new Date(),
  day_end: newDate(new Date(), { hPlus: 15 }),
  meals_dist_percents: [30, 50, 20],
  diet_type: "neutral",
};

export const handleCreateNutritionMenu: RequestHandler = (req, res, next) => {
  createNutritionMenu(nutritionQuestionnaires);
};
