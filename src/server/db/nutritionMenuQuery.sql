-- -- -- select * from foods where not food_id = any(Array[1,2,3]) and not allergens&&ARRAY['גלוטן','ביצים','סויה'] and kosher=true
WITH
    all_meals_food AS (
        SELECT
            *
        from
            meals_foods as mf
            INNER JOIN foods as f on mf.food_id = f.food_id
    ),
    pro AS (
        SELECT
            am.meal_id,
            am.food_name,
            am.food_amount
        from
            all_meals_food as am
        where
            nutrient_type = 'proteins'
        GROUP BY
            (am.meal_id, am.food_name, am.food_amount)
    ),
    fats AS (
        SELECT
            am.meal_id,
            am.food_name,
            am.food_amount
        from
            all_meals_food as am
        where
            nutrient_type = 'fats'
        GROUP BY
            (am.meal_id, am.food_name, am.food_amount)
    ),
    carbs AS (
        SELECT
            am.meal_id,
            am.food_name,
            am.food_amount
        from
            all_meals_food as am
        where
            nutrient_type = 'carbohydrates'
        GROUP BY
            (am.meal_id, am.food_name, am.food_amount)
    ),
    caloires_nutrients AS (
        select
            nmm.meal_id,
            nmm.calories_total,
            nmm.protein_cals,
            nmm.fat_cals,
            nmm.carbs_cals
        from
            nutrition_menus_meals nmm
            INNER JOIN meals m on nmm.meal_id = m.meal_id
    ),
    meal AS (
        select
            mf.meal_id,
            json_build_object (
                'calories_total',
                (
                    select
                        calories_total
                    from
                        caloires_nutrients
                    where
                        mf.meal_id = caloires_nutrients.meal_id
                ),
                'protein_cals',
                (
                    select
                        protein_cals
                    from
                        caloires_nutrients
                    where
                        mf.meal_id = caloires_nutrients.meal_id
                ),
                'fat_cals',
                (
                    select
                        fat_cals
                    from
                        caloires_nutrients
                    where
                        mf.meal_id = caloires_nutrients.meal_id
                ),
                'carbs_cals',
                (
                    select
                        carbs_cals
                    from
                        caloires_nutrients
                    where
                        mf.meal_id = caloires_nutrients.meal_id
                ),
                'proteins',
                (
                    select
                        json_agg (pro)
                    from
                        pro
                    where
                        mf.meal_id = pro.meal_id
                ),
                'fats',
                (
                    select
                        json_agg (fats)
                    from
                        fats
                    where
                        mf.meal_id = fats.meal_id
                ),
                'carbs',
                (
                    select
                        json_agg (carbs)
                    from
                        carbs
                    where
                        mf.meal_id = carbs.meal_id
                )
            ) as meal_details
        from
            meals_foods mf
        GROUP BY
            (mf.meal_id)
    ),
    nutrition_menu AS (
        select
            nmm.nutrition_menu_id,
            json_build_object (
                'meals',
                (
                    select
                        json_agg (meal)
                    from
                        meal
                )
            ) as menu
        from
            nutrition_menus_meals nmm
            INNER JOIN meal m on m.meal_id = m.meal_id
        GROUP BY
            (nmm.nutrition_menu_id)
    )
    -- select
    --     *
    -- from
    --     nutrition_menu;