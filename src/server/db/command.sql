-- select * from foods where not food_id = any(Array[1,2,3]) and not allergens&&ARRAY['גלוטן','ביצים','סויה'] and kosher=true
WITH
    all_meals_food AS (
        SELECT
            *
        from
            meals_foods as mf
            INNER JOIN foods as f on mf.food_id = f.food_id
    ),
    build_pro_arr as (
        select
            json_agg (all_meals_food)
        from
            all_meals_food
        where
            nutrient_type = 'proteins'
    ),
    meal AS (
        select
            mf.meal_id,
            json_build_object (
                'proteins',
                (
                    select
                        json_agg (all_meals_food)
                    from
                        all_meals_food
                    where
                        nutrient_type = 'proteins'
                ),
                'fats',
                (
                    select
                        json_agg (all_meals_food)
                    from
                        all_meals_food
                    where
                        nutrient_type = 'fats'
                ),
                'carbs',
                (
                    select
                        json_agg (all_meals_food)
                    from
                        all_meals_food
                    where
                        nutrient_type = 'carbhytorates'
                )
            ) as nutrients
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
            nmm.nutrition_menu_id
    )
select
    *
from
    nutrition_menu nm;