/* eslint-disable no-unused-vars */
import { join } from "path";
import { cwd } from "process";

export const CREATE_DB_TABLE_SQL_FILE = "create_db_tables.sql";

export const DB_FOLDER_PATH = join(cwd(), "db");
export const CREATE_DB_TABLE_SQL_FILE_PATH = join(
  DB_FOLDER_PATH,
  CREATE_DB_TABLE_SQL_FILE
);

export enum TABLES_DATA {
  MUSCLES_GROUP_TABLE_NAME = "muscles_group",
  MUSCLE_GROUP_ID = "muscles_group_id",
  LEADS_TABLE_NAME = "leads",
  LEADS_TABLE_ID = "lead_id",
  CITIES_TABLE_NAME = "cities",
  CITY_ID = "city_id",
  LOCATION_TABLE_NAME = "locations",
  LOCATION_ID = "location_id",
  PROVIDERS_TABLE_NAME = "providers",
  PROVIDERS_ID = "provider_id",
  EXPENSES_TABLE_NAME = "expenses",
  EXPENSES_ID = "expense_id",
  EQUIPMENTS_TABLE_NAME = "equipments",
  EQUIPMENTS_ID = "equipment_id",
  EXERCISES_LIST_TABLE_NAME = "exercises_list",
  EXERCISES_ID = "exercise_id",
  PROFILES_TABLE_NAME = "profiles",
  PROFILE_ID = "profile_id",
  SUBSCRIPTION_PLANS_TABLE_NAME = "subscription_plans",
  SUBSCRIPTION_PLANS_TABLE_ID = "subscription_plan_id",
  TRAINING_PROGRAMS_LIST_TABLE_NAME = "training_programs_list",
  TRAINING_PROGRAMS_LIST_ID = "training_programs_list_id",
  NUTRITION_PROGRAM_LIST_TABLE_NAME = "nutrition_programs_list",
  NUTRITION_PROGRAM_LIST_ID = "nutrition_programs_list_id",
  NUTRITION_PROGRAM_TABLE_NAME = "nutrition_program",
  NUTRITION_PROGRAM_ID = "nutrition_program_id",
  TRAINING_PROGRAM_TABLE_NAME = "training_program",
  TRAINING_PROGRAM_ID = "training_program_row_id",
  WEEKLY_TABLE_NAME = "weeks",
  WEEKLY_ID = "week_id",
  INCOMES_TABLE_NAME = "incomes",
  INCOME_ID = "income_id",
}
