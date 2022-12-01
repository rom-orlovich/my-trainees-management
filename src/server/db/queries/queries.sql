-- A simple 'WITH-CLAUSE' example
-- Gets all the foods whose calories_total 
-- is bigger than the average calories_total.
WITH
    food_w AS (
        SELECT
            avg(calories_total)
        FROM
            foods
    )
SELECT
    food_name,
    calories_total
FROM
    foods
WHERE
    calories_total > (
        SELECT
            *
        FROM
            food_w
    );

-- Complex example with 'WITH-CLAUSE', json_build_object, and json_agg.
-- Gets only the foods that their type is proteins.
WITH
    food_proteins_res AS (
        SELECT
            *
        FROM
            foods
        WHERE
            nutrient_type = 'proteins'
    ),
    -- Creates a JSON for each result of the first query.
    food_json_protein AS (
        SELECT
            fpr.food_id,
            json_build_object ('food_name', fpr.food_name, 'nutrient_type', fpr.nutrient_type, 'protein_cals', fpr.protein_cals) AS food_agg
        FROM
            food_proteins_res AS fpr
        GROUP BY
            (fpr.food_id, fpr.food_name, fpr.nutrient_type, fpr.protein_cals)
    )

-- Creates an object with an array from the second query's result.
SELECT
    json_build_object ('proteins_arr', json_agg (food_agg)) AS proteins_arr
FROM
    food_json_protein;

    --Example JSON operators - get the protein_cals average.
    SELECT
        avg(((food_agg::json->>'protein_cals')::FLOAT))
    FROM
        food_json_protein;





    -- Example of the usage of json_populate_recordset
    DROP TABLE IF EXISTS tmp;
    CREATE TABLE
        IF NOT EXISTS tmp (a integer);
        INSERT INTO tmp SELECT * FROM json_populate_recordset(null::tmp,'[{"a":1},{"a":2}]');
    SELECT
        *
    FROM
        tmp;




    -- Example of usage of array operators.
    -- The purpose of 'not food_id = any('{1,2,3}')'' is to filter all the food_id that are not in the list.
    -- The purpose of 'not allergens &&ARRAY['חלב']' is to filter all food that overlaps between the allergens array and the input ['חלב'].
    SELECT 
     food_id,food_name ,allergens
    FROM
        foods
    WHERE
      NOT food_id = ANY('{1,2,3}') AND NOT allergens &&ARRAY['חלב']