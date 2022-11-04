import { OmitKey, PickKey } from "../../types";
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */

// All the endpoints and the entities names.
export enum API_ROUTES {
  API_AUTH_ROUTE = "/api/auth",
  SIGN_UP_ROUTE = "/signup",
  EMAIL_VERIFY_ROUTE = "/email/verify",
  LOGIN_ROUTE = "/login",
  REGISTER_TRAINEE_ROUTE = "/register/trainee",
  REFRESH_TOKEN_ROUTE = "/token/refresh",
  LOGOUT_ROUTE = "/logout",
  USERS_ROUTE = "/api/users",
  CHANGE_USER_CRED_ROUTE = "/credentials/change",
  USER_ENTITY = "user",
  ALERTS_ROUTE = "/api/alerts",
  ALERTS_ENTITY = "alert",
  LEADS_ROUTE = "/api/leads",
  LEADS_ENTITY = "lead",
  MUSCLES_GROUP_ROUTE = "/api/musclesGroups",
  MUSCLES_GROUP_ENTITY = "musclesGroup",
  CITIES_ROUTE = "/api/cities",
  CITIES_ENTITY = "city",
  LOCATIONS_ROUTE = "/api/locations",
  LOCATIONS_ENTITY = "location",
  PROVIDERS_ROUTE = "/api/providers",
  PROVIDERS_ENTITY = "provider",
  WEEKS_ROUTE = "/api/weeks",
  WEEKS_ENTITY = "week",

  EQUIPMENTS_ROUTE = "/api/equipments",
  EQUIPMENTS_ENTITY = "equipment",
  EXERCISES_ROUTE = "/api/exercises",
  EXERCISES_ENTITY = "exercise",
  TRAINING_PROGRAMS_LIST_ROUTE = "/api/trainingProgramsList",
  TRAINING_PROGRAMS_LIST_ENTITY = "trainingProgramList",
  TRAINING_PROGRAMS_ROUTE = "/api/trainingPrograms",
  TRAINING_PROGRAMS_STATS_ROUTE = "/api/trainingPrograms",
  TRAINING_PROGRAMS_ENTITY = "exercise",
  NUTRITION_PROGRAMS_LIST_ROUTE = "/api/nutritionProgramsList",
  NUTRITION_PROGRAMS_LIST_ENTITY = "nutritionProgramList",
  NUTRITION_PROGRAMS_ROUTE = "/api/nutritionPrograms",
  NUTRITION_PROGRAMS_ENTITY = "week",
  MEASURES_ROUTE = "/api/measures",
  MEASURE_ENTITY = "measure",
  TRAINEES_ROUTE = "/api/trainees",
  TRAINEES_ENTITY = "trainee",
  SUBSCRIPTION_PLANS_ROUTE = "/api/subscriptionPlans",
  SUBSCRIPTION_PLANS_ENTITY = "subscription",
  INCOMES_ROUTE = "/api/incomes",
  INCOMES_ENTITY = "income",
  EXPENSES_ROUTE = "/api/expenses",
  EXPENSES_ENTITY = "expense",
  PRODUCTS_ROUTE = "/api/products",
  PRODUCT_ENTITY = "product",

  ACTIVITIES_ROUTE = "/api/activities",
  ACTIVITIES_ENTITY = "activity",
  MEETINGS_ROUTE = "/api/meetings",
  MEETINGS_ENTITY = "meeting",
  PARTICIPANTS_GROUP_ROUTE = "/api/participantsGroup",
  PARTICIPANTS_GROUP_ENTITY = "participantsGroup",
  PARTICIPANTS_GROUPS_LIST_ROUTE = "/api/participantsGroupsList",
  PARTICIPANTS_GROUPS_LIST_ENTITY = "participantsGroupsList",
}
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
  trainee_id?: number;
  trainer_user_id: number;
  profile_id: number;
  role: "admin" | "trainer" | "trainee";
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

export interface MeasuresAPI {
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
  crabs_g: number;
  protein_cals: number;
  fat_cals: number;
  crabs_cals: number;
  calories_total: number;
}

export interface NutritionProgramsListTable {
  user_id?: number;
  nutrition_programs_list_id?: number;
  trainee_id: number;
  program_type?: string | null;
  date_start: Date;
  date_end?: Date | null;
  note_topic: string | null;
  note_text: string | null;
}

export interface NutritionProgramsTable {
  nutrition_program_id?: number;
  nutrition_programs_list_id: number;
  week_id: number;
  note_topic: string | null;
  note_text: string | null;
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
export interface ChartsDataAPI {
  labelFormatted: string[];
  datasetsValues: number[];
}
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
  location_id: number;
  city_name?: string;
  street?: string;
  note_topic: string;
  note_text: string;
  user_id?: number;
}
// export type MeetingTableAPI = OmitKey<MeetingAPI, "participants_group"> &
//   PickKey<
//     ParticipantsGroupTableAPI,
//     "first_name" | "last_name" | "trainee_id" | "participants_group_id"
//   >;
