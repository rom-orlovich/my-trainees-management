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
export interface NutritionQuestionnaires {
  user_id: number;
  allergens: string[];
  black_list_foods: number[];
  favorite_foods: number[];
  kosher: boolean;
  profile_id: number;
  day_start: Date;
  day_end: Date;
  meals_dist_percents: number[];
}
