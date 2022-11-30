with
    meals_foods_w as (
        SELECT
            nmm.*,
            mf.food_id,
            mf.food_amount
        from
            nutrition_menus_meals as nmm
            INNER join meals_foods as mf on mf.meal_id = nmm.meal_id
        where
            nutrition_menu_id = $1
    ),
    foods_w as (
        SELECT
            mfw.meal_id,
            nutrient_type,
            f.food_id,
            food_name,
            food_amount
        from
            meals_foods_w as mfw
            INNER join foods as f on f.food_id = mfw.food_id
    ),
    meals_foods_join AS (
        SELECT
            mfw.meal_id,
            json_build_object (
                'calories_total',
                (mfw.calories_total),
                'protein_cals',
                (mfw.protein_cals),
                'fat_cals',
                (mfw.fat_cals),
                'carbs_cals',
                (mfw.carbs_cals),
                'proteins',
                (
                    select
                        json_agg (json_build_object ('meal_id', fw.meal_id, 'food_id', fw.food_id, 'food_name', fw.food_name, 'food_amount', fw.food_amount))
                    from
                        foods_w as fw
                    where
                        nutrient_type = 'proteins'
                        and mfw.meal_id = fw.meal_id
                ),
                'fats',
                (
                    select
                        json_agg (json_build_object ('meal_id', fw.meal_id, 'food_id', fw.food_id, 'food_name', fw.food_name, 'food_amount', fw.food_amount))
                    from
                        foods_w as fw
                    where
                        nutrient_type = 'fats'
                        and mfw.meal_id = fw.meal_id
                ),
                'carbohydrates',
                (
                    select
                        json_agg (json_build_object ('meal_id', fw.meal_id, 'food_id', fw.food_id, 'food_name', fw.food_name, 'food_amount', fw.food_amount))
                    from
                        foods_w as fw
                    where
                        nutrient_type = 'carbohydrates'
                        and mfw.meal_id = fw.meal_id
                )
            ) as meals_details
        FROM
            meals_foods_w as mfw
        GROUP BY
            (mfw.meal_id, mfw.calories_total, mfw.protein_cals, mfw.fat_cals, mfw.carbs_cals)
        order by
            mfw.meal_id asc
    )
select
    nmm.nutrition_menu_id,
    json_agg (meals_details) as meals
from
    meals_foods_join as mfj
    INNER JOIN nutrition_menus_meals as nmm on nmm.meal_id = mfj.meal_id
GROUP BY
    (nmm.nutrition_menu_id)