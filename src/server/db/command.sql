-- select * from foods where not food_id = any(Array[1,2,3]) and not allergens&&ARRAY['גלוטן','ביצים','סויה'] and kosher=true
WITH
    foods_cho AS (
        SELECT
            *
        from
            meals_foods as mf
            INNER JOIN foods as f on mf.food_id = f.food_id
    ),
    pro AS (
        SELECT
            *
        from
            foods_cho
        where
            nutrient_type = 'proteins'
    ),
    fats AS (
        SELECT
            *
        from
            foods_cho
        where
            nutrient_type = 'fats'
    ),
    carbs AS (
        SELECT
            *
        from
            foods_cho
        where
            nutrient_type = 'carbhytorates'
    ),
    meal AS (
        select
            mf.meal_id,
            json_build_object (
                'pro',
                (
                    select
                        json_agg (pro)
                    from
                        pro
                ),
                'fats',
                (
                    select
                        json_agg (fats)
                    from
                        fats
                ),
                'carbs',
                (
                    select
                        json_agg (carbs)
                    from
                        carbs
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
    nutrition_menus nms
    INNER JOIN nutrition_menu as nms2 on nms.nutrition_menu_id = nms2.nutrition_menu_id;