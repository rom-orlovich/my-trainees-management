/* eslint-disable no-unused-vars */
import { join } from "path";
import { cwd } from "process";

export const TRAINEES_MANAGEMENT_SQL_FILE = "trainees_management.sql";

export const DB_FOLDER_PATH = join(cwd(), "db");
export const TRAINEES_MANAGEMENT_SQL_PATH = join(
  DB_FOLDER_PATH,
  TRAINEES_MANAGEMENT_SQL_FILE
);

export const WEEKLY_ID = "week_id";
export const NOTE_ID = "note_id";
export const CITY_ID = "city_id";
export const MUSCULE_GROUP_ID = "muscles_group_id";
export const LOCATION_ID = "location_id";
export const PROFILE_ID = "profile_id";
export const PROVIDERS_ID = "provider_id";
export const EXPENSES_ID = "expense_id";
export const EQUIPMENTS_ID = "equipment_id";
export const EXERCISES_ID = "exercise_id";
export const INCOME_ID = "income_id";

export const TRAINING_PROGRAM_ID = "training_program_row_id";
export const TRAINING_PROGRAMS_LIST_ID = "training_programs_list_id";
export const NUTRITION_PROGRAM_ID = "nutrition_program_id";
export const NUTRITION_PROGRAM_LIST_ID = "nutrition_programs_list_id";
export const LEADS_TABLE_ID = "lead_id";
export const LEADS_TABLE_NAME = "leads";
export const WEEKLY_TABLE_NAME = "weeks";
export const NOTES_TABLE_NAME = "notes";
export const CITIES_TABLE_NAME = "cities";
export const MUSCULES_GROUP_TABLE_NAME = "muscles_group";
export const LOCATION_TABLE_NAME = "locations";
export const PROFILES_TABLE_NAME = "profiles";

export const SUBSCRIPTION_PLANS_TABLE_NAME = "subscription_plans";
export const SUBSCRIPTION_PLANS_TABLE_ID = "subscription_plan_id";
export const PROVIDERS_TABLE_NAME = "providers";
export const EXPENSES_TABLE_NAME = "expenses";
export const EQUIPMENTS_TABLE_NAME = "equipments";
export const EXERCISES_LIST_TABLE_NAME = "exercises_list";
export const INCOMES_TABLE_NAME = "incomes";
export const TRAINING_PROGRAM_TABLE_NAME = "training_program";
export const TRAINING_PROGRAMS_LIST_TABLE_NAME = "training_programs_list";
export const NUTRITION_PROGRAM_TABLE_NAME = "nutrition_program";
export const NUTRITION_PROGRAM_LIST_TABLE_NAME = "nutrition_programs_list";
export const TRACK_PROGRAMS_TABLE_NAME = "track_programs";
