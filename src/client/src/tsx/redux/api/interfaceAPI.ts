import { FoodProps } from "../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsListForm";
import { OmitKey, PickKey } from "../../types";

// All the endpoints and the entities names.

export interface PayloadAPI<T> {
  id: number;
  payload: T;
}
export interface ResponseMutationAPI {
  message: string;
  id?: number;
}
export interface ErrorResponseMutationAPI {
  data: { message: string };
  status: number;
}
export interface User {
  user_id: number;
  username: string;
  email: string;
  trainee_id?: number | null;
  trainer_user_id: number | null;
  profile_id: number;
  role: "admin" | "trainer" | "trainee";
  verify_token: null;
}

export interface ResponseMutationAuthAPI {
  accessToken: string;
  message: string;
  user: User;
}

export interface ResponseQueryAPI<T> {
  next: boolean;
  data: T[];
  countRows: number;
}

export interface LoginForm {
  username: string;
  password: string;
}
export interface SignUpForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export interface ChangePasswordForm {
  password: string;
  confirmPassword: string;
}
export interface EmailVerifyForm {
  email: string;
  confirmEmail: string;
}

export interface AlertsAPI {
  user_id?: number;
  alert_id: number;
  alert_date: Date;
  alert_message: string;
}

export interface MusclesGroupTableAPI {
  user_id?: number;
  muscles_group_id?: number;
  muscles_group_name: string;
}

export interface LeadsTableAPI {
  user_id?: number;
  lead_id?: number;
  lead_date: Date;
  first_name: string;
  last_name: string;
  city_name?: string;
  gender: string;
  location_id: number;
  birthday: Date;
  phone_number: string;
  email?: string;
  status: boolean;
  note_topic: string | null;
  note_text: string | null;
}
export interface CitiesTableAPI {
  user_id?: number;
  city_id?: number;
  city_name: string;
  district?: string | null;
  population?: number | null;
}

export interface LocationsTableAPI {
  user_id?: number;
  city_id: number;
  location_id: number;
  street?: string | null;
}

export interface ProvidersTableAPI {
  user_id?: number;
  location_id: number;
  provider_name: string;
  provider_id?: number;
}

export interface WeeksTableAPI {
  date: Date;
  day: number;
  week_id?: number;
  weight?: number | null;
}

export interface EquipmentsTableAPI {
  user_id?: number;
  equipment_id?: number;
  equipment_name: string;
  brand: string;
  manufacture_year: number;
  expense_id?: number | null;
}

export interface ExercisesTableAPI {
  user_id?: number;
  exercise_id?: number;
  exercise_name: string;
  equipment_id?: number;
  equipment_name: string;
  muscles_group_id: number;
  muscles_group_name: string;
}

export interface TrainingProgramsListTableAPI {
  training_programs_list_id?: number;
  trainee_id: number;
  program_type?: string;
  update_date?: Date;
  date_start: Date;
  date_end?: Date;
  note_topic?: string;
  note_text?: string;
}

export interface MeasuresRawAPI {
  measure_id?: number;
  date: Date;
  weight: number;
  height: number;
  activity_factor: number;
  fat_percents?: number;
  protein_per_kg: number;
  fat_per_kg: number;
  fixed_cals?: number;
}
export interface MeasuresCalResAPI {
  measure_id: number;
  date: Date;
  weight: number;
  height: number;
  activity_factor: number;
  fat_percents?: number;
  protein_per_kg: number;
  fat_per_kg: number;
  fixed_cals?: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  protein_cals: number;
  fat_cals: number;
  carbs_cals: number;
  calories_total: number;
}

export interface NutritionMenuTableApi {
  nutrition_menu_id?: number;
  date_start: Date;
  date_end?: Date;
  note_topic: string;
  note_text: string;
  profile_id: number;
  user_id: number;
}

export interface TraineesBaseTableAPI {
  trainer_user_id?: number;
  measure_id?: number;
  trainee_id: number;
  username: string;
  user_id?: number;
  profile_id?: number;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: Date;
  identify_num: string;
  location_id: number;
  email: string;
  phone_number: string;
  date_join: Date;
  status: boolean;
}

export interface SubscriptionPlansAPI {
  subscription_plan_id?: number;
  trainee_id: number;
  product_id: number;
  product_name?: string;
  current_num_trainings: number;
  total_trainings: number;
  last_training: Date;
}

export type LocationsGetRes = LocationsTableAPI &
  PickKey<CitiesTableAPI, "city_name">;
export type TraineesTableExtendsAPI = TraineesBaseTableAPI &
  PickKey<CitiesTableAPI, "city_name"> &
  PickKey<LocationsTableAPI, "street">;

export interface TrainingProgramExerciseTableAPI {
  training_program_row_id: number;
  training_programs_list_id: number;
  update_date: Date;
  exercise_id: number;
  reps: string;
  sets: number;
  rest: string;
  intensity: string;
  rpe: number;
  muscles_group_name: string;
  equipment_name: string;
  exercise_name: string;
  note_topic: string | null;
  note_text: string | null;
}
export type TrainingProgramExerciseOmit = OmitKey<
  TrainingProgramExerciseTableAPI,
  "equipment_name" | "muscles_group_name" | "exercise_name"
>;

export interface ExerciseStatsAPI {
  training_program_row_id: number;
  update_date: Date;
  exercise_id: number;
  reps: string;
  sets: number;
  rest: number;
  intensity: number;
  rpe: number;
}
// export interface ChartsDataAPI {
//   labelFormatted: string[];
//   datasetsValues: number[];
// }
export interface ExpensesTableAPI {
  user_id?: number;
  date: Date;
  expense_id?: number;
  product_name: string;
  amount: number;
  total_price: number;
  note_topic: string | null;
  note_text: string | null;
  product_id: number;
  seller_name: string;
}
export interface IncomesTableAPI {
  income_id?: number;
  product_id: number;
  date: Date;
  buyer_id: number;
  first_name: string;
  last_name: string;
  price: number;
  product_name: string;
  amount: number;
  total_price: number;
  note_topic?: string;
  note_text?: string;
  user_id?: number;
}

export interface ProductAPI {
  product_id?: number;
  product_name: string;
  product_type: string;
  max_training?: number;
  price: number;
  user_id?: number;
}

export interface ParticipantsGroupTableAPI {
  participants_group_id?: number;
  participants_groups_list_id?: number;
  trainee_id: number;
  user_id?: number;
  first_name?: string;
  last_name?: string;
  profile_id: number;
  username?: string;
}
export interface ParticipantsGroupsListTableAPI {
  participants_groups_list_id?: number;
  is_private: boolean;
  group_name: string;
  user_id?: number;
}
export interface ActivitiesTableAPI {
  activity_id?: number;
  activity_name?: string;
  user_id?: number;
}

export interface MeetingAPI {
  meeting_id?: number;
  date_start: Date;
  date_end: Date;
  participants_groups_list_id: number;
  activity_id: number;
  activity_name?: string;
  group_name: string;
  location_id: number;
  city_name?: string;
  street?: string;
  note_topic: string;
  note_text: string;
  user_id?: number;
}

export interface ChartsDataAPI<V> {
  labelFormatted: string[];
  datasetsValues: V;
}

export interface FinancesValues {
  expenses: number[];
  incomes: number[];
}

export interface FinancesValue {
  expenses: number;
  incomes: number;
}

export interface ResultDistributionFinances {
  incomes: ChartsDataAPI<number>;
  expenses: ChartsDataAPI<number>;
}
export interface ProductData {
  totalPrice: number[];
  amounts: number[];
}

export interface FinanceAPI {
  incomes: ResponseQueryAPI<IncomesTableAPI>;
  expenses: ResponseQueryAPI<ExpensesTableAPI>;
  stats: {
    totalFinancesSum: FinancesValue;
    graphStats?: ChartsDataAPI<FinancesValues>;
    mostSpendingCustomers: {
      incomes: ChartsDataAPI<ProductData>;
    };
    resultPopularIncomesExpenses: {
      incomes: ChartsDataAPI<ProductData>;
      expenses: ChartsDataAPI<ProductData>;
    };
  };
}
export interface GetCitiesGendersAgesStatsAPI {
  agesStatsRes?: ChartsDataAPI<number[]>;
  gendersStatsRes?: ChartsDataAPI<number[]>;
  calStatsCitiesRes?: ChartsDataAPI<number[]>;
  calStatusHandlesRes?: ChartsDataAPI<number[]>;
  graphStats?: ChartsDataAPI<number[]>;
}

export enum GRAPH_TIME_LINE {
  ALL = "all",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  MONTHS = "months",
  YEARS = "years",
}
export enum CHART_DISPLAY {
  GRAPH = "graph",
  DISTRIBUTION = "distribution",
  ALL = "all",
}

export interface FoodNutrientDetails {
  meal_id: number;
  food_id: number;
  food_name: string;
  food_amount: number;
}

export interface MealDetails {
  calories_total: number;
  protein_cals: number;
  fat_cals: number;
  carbs_cals: number;
  proteins: FoodNutrientDetails[];
  fats: FoodNutrientDetails[];
  carbohydrates: FoodNutrientDetails[];
}

export interface NutritionMenuAPI {
  message: string;
  nutrition_menu_id: number;
  meals: MealDetails[];
}
export type DietTypes = "cutting" | "bulking" | "neutral";
export interface NutritionQuestionnaire {
  nutrition_questionnaire_id?: number;
  day_start: Date;
  day_end: Date;
  allergens: string[];
  black_list_foods: FoodProps[];
  favorite_foods: FoodProps[];
  kosher?: boolean;
  is_vegan?: boolean;
  is_vegetarian?: boolean;
  is_keep_meat_milk?: boolean;
  diet_type: DietTypes;
  meals_calories_size_percents: number[];
  profile_id: number;
  user_id: number;
}

export type KosherType = "בשרי" | "חלבי" | "פרווה";

export type NutrientsTypes = "proteins" | "fats" | "carbohydrates";
export type FoodType = "בשרי" | "טבעוני" | "צמחוני";

export interface FoodAPI {
  food_id?: number;
  food_name: string;
  calories_total: number;
  protein_g: number;
  protein_cals: number;
  carbs_g: number;
  carbs_cals: number;
  sugars_g: number;
  fat_g: number;
  fat_cals: number;
  saturated_fat: number;
  cholesterol_mg: number;
  sodium_mg: number;
  nutrient_type: NutrientsTypes;
  allergens: string[];
  kosher: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  kosher_type: KosherType;
  food_score: number;
  food_density: number;
  user_id?: number;
}
