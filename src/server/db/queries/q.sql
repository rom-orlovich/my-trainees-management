INSERT INTO nutrition_questionnaires (user_id,day_start,day_end,profile_id,diet_type,kosher,is_vegan,is_vegetarian,is_keep_meat_milk,meals_calories_size_percents,allergens,favorite_foods,black_list_foods)
     VALUES (2,"10:00","23:59",3,"neutral",false,false,false,false,"[31,39,30]","[]","[{\"food_id\":85,\"food_name\":\"חזה עוף מבושל-מטוגן\"}]","[]") ON CONFLICT (nutrition_questionnaire_id) DO UPDATE SET
    nutrition_questionnaire_id=excluded.nutrition_questionnaire_id,
      allergens= excluded.allergens,
  black_list_foods=excluded.black_list_foods,
  favorite_foods=excluded.favorite_foods,
  kosher=excluded.kosher,
  is_vegan=excluded.is_vegan,
  is_vegetarian=excluded.is_vegetarian,
  day_start=excluded.day_start,
  day_end=excluded.day_end,
  meals_calories_size_percents=excluded.meals_calories_size_percents,
  profile_id=excluded.profile_id,
  diet_type=excluded.diet_type,
  user_id=excluded.user_id RETURNING *  