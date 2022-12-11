import { Food } from "../../foodsDataScraperService/foodsDataScraperServiceTypes";
import { getAmountOFfood } from "../utilities/helpersCreateNutritionMenu";

const fatsNutrientFoodAmountWithoutRemainder: Food = {
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
const fatsNutrientFoodWithRemainder: Food = {
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
const proteinNutrientFoodWithoutRemainder: Food = {
  food_id: 1403,
  food_name:
    "20 גרם חלבון בגביע - יוגורט בטעם פירות יער 0% שומן - דנונה PRO, שטראוס עלית",
  sugars_g: 5.6,
  saturated_fat: 0,
  cholesterol_mg: 0,
  is_vegan: false,
  is_vegetarian: true,
  kosher: true,
  kosher_type: "חלבי",
  calories_total: 65,
  protein_cals: 40,
  protein_g: 10,
  carbs_cals: 22.4,
  carbs_g: 5.6,
  fat_cals: 0,
  fat_g: 0,
  sodium_mg: 33,
  nutrient_type: "proteins",
  allergens: ["חלב"],
  food_density: 0.65,
  food_score: 833.5,
};
const proteinNutrientFoodWithRemainder: Food = {
  food_id: 305,
  food_name: "אנטרקוט בקר מבושל-צלוי",
  sugars_g: 0,
  saturated_fat: 6.506,
  cholesterol_mg: 126,
  is_vegan: false,
  is_vegetarian: false,
  kosher: true,
  kosher_type: "בשרי",
  calories_total: 265,
  protein_cals: 106.32,
  protein_g: 26.58,
  carbs_cals: 0,
  carbs_g: 0,
  fat_cals: 150.84,
  fat_g: 16.76,
  sodium_mg: 53,
  nutrient_type: "proteins",
  allergens: [],
  food_density: 2.65,
  food_score: 44.88,
};

const proteinNutrientFoodExact: Food = {
  food_id: 214,
  food_name: "בקלה פסיפי מבושל-מיובש בחום",
  sugars_g: 0,
  saturated_fat: 0.105,
  cholesterol_mg: 57,
  is_vegan: true,
  is_vegetarian: true,
  kosher: true,
  kosher_type: "פרווה",
  calories_total: 85,
  protein_cals: 74.92,
  protein_g: 18.73,
  carbs_cals: 0,
  carbs_g: 0,
  fat_cals: 4.5,
  fat_g: 0.5,
  sodium_mg: 372,
  nutrient_type: "proteins",
  allergens: [],
  food_density: 0.85,
  food_score: 861.28,
};
const crabsNutrientFoodWithoutReminder: Food = {
  food_id: 1226,
  food_name: "באדי בטעם וניל, תנובה",
  sugars_g: 9.9,
  saturated_fat: 0,
  cholesterol_mg: 0,
  is_vegan: false,
  is_vegetarian: true,
  kosher: true,
  kosher_type: "חלבי",
  calories_total: 77,
  protein_cals: 12.4,
  protein_g: 3.1,
  carbs_cals: 51.2,
  carbs_g: 12.8,
  fat_cals: 13.5,
  fat_g: 1.5,
  sodium_mg: 85,
  nutrient_type: "carbohydrates",
  allergens: ["חלב"],
  food_density: 0.77,
  food_score: 221.24,
};

describe("tests createNutritionMenu ", () => {
  describe("test getAmountOFfood", () => {
    describe("fats foods amounts", () => {
      test("fats foods amount without remainder", () => {
        const amount = getAmountOFfood(
          fatsNutrientFoodAmountWithoutRemainder,
          156.24,
          629.3,
          "fat_cals"
        );
        expect(amount).toBe(1);
      });
      test("fats foods amount with remainder", () => {
        const amount = getAmountOFfood(
          fatsNutrientFoodWithRemainder,
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
          proteinNutrientFoodWithoutRemainder,
          176.4,
          710.5,
          "protein_cals"
        );
        expect(amount).toBe(2);
      });
      test("protein foods amount with remainder", () => {
        const amount = getAmountOFfood(
          proteinNutrientFoodWithRemainder,
          176.4,
          710.5,
          "protein_cals"
        );
        expect(amount).toBe(0.75);
      });
      test("protein foods amount exact", () => {
        const amount = getAmountOFfood(
          proteinNutrientFoodExact,
          107.64,
          433.55,
          "protein_cals"
        );
        expect(amount).toBe(1);
      });
    });
    describe("carbs foods amounts", () => {
      test("carbs foods amount without remainder", () => {
        const amount = getAmountOFfood(
          crabsNutrientFoodWithoutReminder,
          398.58,
          791.5,
          "carbs_cals"
        );
        expect(amount).toBe(5);
      });
    });
  });
});
