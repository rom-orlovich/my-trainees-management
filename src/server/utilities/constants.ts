/* eslint-disable no-unused-vars */
import { join } from "path";
import { cwd } from "process";

export const CREATE_DB_TABLE_SQL_FILE = "create_db_tables.sql";
export const CREATE_DUMMY_DATA_SQL_FILE = "dummy_data.sql";

export const DB_FOLDER_PATH = join(cwd(), "db");
export const CREATE_DB_TABLE_SQL_FILE_PATH = join(
  DB_FOLDER_PATH,
  CREATE_DB_TABLE_SQL_FILE
);
export const CREATE_DUMMY_DATA_FILE_PATH = join(
  DB_FOLDER_PATH,
  CREATE_DUMMY_DATA_SQL_FILE
);

export enum TABLES_DATA {
  ALERTS_TABLE_NAME = "alerts",
  ALERTS_TABLE_ID = "alert_id",

  USERS_TABLE_NAME = "users",
  USERS_TABLE_ID = "user_id",

  TRAINEES_TABLE_NAME = "trainees",
  TRAINEE_ID = "trainee_id",
  PROFILES_TABLE_NAME = "profiles",
  PROFILE_ID = "profile_id",

  LEADS_TABLE_NAME = "leads",
  LEADS_TABLE_ID = "lead_id",

  CITIES_TABLE_NAME = "cities",
  CITY_ID = "city_id",
  LOCATION_TABLE_NAME = "locations",
  LOCATION_ID = "location_id",

  PROVIDERS_TABLE_NAME = "providers",
  PROVIDERS_ID = "provider_id",

  MUSCLES_GROUP_TABLE_NAME = "muscles_group",
  MUSCLE_GROUP_ID = "muscles_group_id",
  EQUIPMENTS_TABLE_NAME = "equipments",
  EQUIPMENTS_ID = "equipment_id",
  EXERCISES_LIST_TABLE_NAME = "exercises_list",
  EXERCISES_ID = "exercise_id",

  SUBSCRIPTION_PLANS_TABLE_NAME = "subscription_plans",
  SUBSCRIPTION_PLANS_TABLE_ID = "subscription_plan_id",
  TRAINING_PROGRAMS_LIST_TABLE_NAME = "training_programs_list",
  TRAINING_PROGRAMS_LIST_ID = "training_programs_list_id",
  TRAINING_PROGRAM_TABLE_NAME = "training_program",
  TRAINING_PROGRAM_ID = "training_program_row_id",
  TRAINING_PROGRAM_EXERCISES_STATS_TABLE_NAME = "training_program_exercises_stats",
  TRAINING_PROGRAM_EXERCISES_STATS_ID = "training_program_exercises_stats_id",

  NUTRITION_PROGRAM_LIST_TABLE_NAME = "nutrition_programs_list",
  NUTRITION_PROGRAM_LIST_ID = "nutrition_programs_list_id",
  NUTRITION_PROGRAM_TABLE_NAME = "nutrition_program",
  NUTRITION_PROGRAM_ID = "nutrition_program_id",
  MEASURES_TABLE_NAME = "measures",
  MEASURE_ID = "measure_id",

  INCOMES_TABLE_NAME = "incomes",
  INCOME_ID = "income_id",
  EXPENSES_TABLE_NAME = "expenses",
  EXPENSES_ID = "expense_id",
  PRODUCTS_TABLE_NAME = "products",
  PRODUCT_ID = "product_id",

  MEETINGS_TABLE_NAME = "meetings",
  MEETINGS_ID = "meeting_id",
  ACTIVITIES_TABLE_NAME = "activities",
  ACTIVITIES_ID = "activity_id",
  PARTICIPANTS_GROUP_TABLE_NAME = "participants_group",
  PARTICIPANTS_GROUP_ID = "participants_group_id",
  PARTICIPANTS_GROUPS_LIST_TABLE_NAME = "participants_groups_list",
  PARTICIPANTS_GROUPS_LIST_ID = "participants_groups_list_id",
}
