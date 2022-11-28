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

export interface NutritionQuestionnaire {
  user_id: number;
  allergens: string[];
  black_list_foods: number[];
  favorite_foods: number[];

  profile_id: number;
  day_start: Date;
  day_end: Date;
  kosher: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  isKeepMeatMilk: boolean;
  diet_type: "cutting" | "bulking" | "neutral";
  meals_dist_percents: number[];
}
