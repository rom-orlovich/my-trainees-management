import { Food } from "../../foodsDataScraperService/foodsDataScraperServiceTypes";
import { getAmountOFfood } from "../utilities/helpersCreateNutritionMenu";

const foodExampleAmountWithOutRemainder: Food = {
  food_id: 1306,
  food_name: "אבוקדו",
  sugars_g: 0.66,
  saturated_fat: 2.126,
  cholesterol_mg: 0,
  is_vegan: true,
  is_vegetarian: true,
  kosher: true,
  kosher_type: "פרווה",
  calories_total: 160,
  protein_cals: 8,
  protein_g: 2,
  carbs_cals: 34.12,
  carbs_g: 8.53,
  fat_cals: 58.64,
  fat_g: 14.66,
  sodium_mg: 7,
  nutrient_type: "fats",
  allergens: [],
  food_density: 1.6,
  food_score: 6.3,
};
const foodExampleWithRemainder: Food = {
  food_id: 823,
  food_name: "אגוזי מקדמיה מיובשים - קלויים ללא תוספת מלח",
  sugars_g: 4.14,
  saturated_fat: 11.947,
  cholesterol_mg: 0,
  is_vegan: true,
  is_vegetarian: true,
  kosher: true,
  kosher_type: "חלבי",
  calories_total: 718,
  protein_cals: 31.16,
  protein_g: 7.79,
  carbs_cals: 53.52,
  carbs_g: 13.38,
  fat_cals: 684.72,
  fat_g: 76.08,
  sodium_mg: 4,
  nutrient_type: "fats",
  allergens: [],
  food_density: 7.18,
  food_score: 3.25,
};

describe("tests createNutritionMenu ", () => {
  describe("test getAmountOFfood", () => {
    describe("fats foods amounts", () => {
      test("fats foods amount without remainder", () => {
        const amount = getAmountOFfood(
          foodExampleAmountWithOutRemainder,
          156.24,
          629.3,
          "fat_cals"
        );
        expect(amount).toBe(0.98);
      });
      test("fats foods amount with remainder", () => {
        const amount = getAmountOFfood(
          foodExampleWithRemainder,
          176.4,
          710.5,
          "fat_cals"
        );
        expect(amount).toBe(0.25);
      });
    });
    describe("protein foods amounts", () => {
      test("protein foods amount without remainder", () => {
        const amount = getAmountOFfood(
          foodExampleAmountWithOutRemainder,
          156.24,
          629.3,
          "fat_cals"
        );
        expect(amount).toBe(0.98);
      });
      test("protein foods amount with remainder", () => {
        const amount = getAmountOFfood(
          foodExampleWithRemainder,
          176.4,
          710.5,
          "fat_cals"
        );
        expect(amount).toBe(0.25);
      });
    });
  });
});
