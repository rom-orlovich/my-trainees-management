import { OmitKey, PickKey } from "../../types";
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */

// I didn't success import the the table interfaces, and API_ROUTES from the server folder,
// so i have to create them again here.

// All the endpoints and the entities names.
export enum API_ROUTES {
  LEADS_ROUTE = "/api/leads",
  LEADS_ENTITY = "lead",
  MUSCLES_GROUP_ROUTE = "/api/musclesGroups",
  MUSCLES_GROUP_ENTITY = "musclesGroup",
  // NOTES_ROUTE = "/api/notes",
  // NOTES_ENTITY = "note",
  CITIES_ROUTE = "/api/cities",
  CITIES_ENTITY = "city",
  LOCATIONS_ROUTE = "/api/locations",
  LOCATIONS_ENTITY = "location",
  PROVIDERS_ROUTE = "/api/providers",
  PROVIDERS_ENTITY = "provider",
  WEEKS_ROUTE = "/api/weeks",
  WEEKS_ENTITY = "week",
  EXPENSES_ROUTE = "/api/expenses",
  EXPENSES_ENTITY = "expense",
  EQUIPMENTS_ROUTE = "/api/equipments",
  EQUIPMENTS_ENTITY = "equipment",
  EXERCISES_ROUTE = "/api/exercises",
  EXERCISES_ENTITY = "exercise",
  TRAINING_PROGRAMS_LIST_ROUTE = "/api/trainingProgramsList",
  TRAINING_PROGRAMS_LIST_ENTITY = "trainingProgramList",
  TRAINING_PROGRAMS_ROUTE = "/api/trainingPrograms",
  TRAINING_PROGRAMS_ENTITY = "exercise",
  NUTRITION_PROGRAMS_LIST_ROUTE = "/api/nutritionProgramsList",
  NUTRITION_PROGRAMS_LIST_ENTITY = "nutritionProgramList",
  NUTRITION_PROGRAMS_ROUTE = "/api/nutritionPrograms",
  NUTRITION_PROGRAMS_ENTITY = "week",
  TRAINEES_ROUTE = "/api/trainees",
  TRAINEES_ENTITY = "trainee",
  SUBSCRIPTION_PLANS_ROUTE = "/api/subscriptionPlans",
  SUBSCRIPTION_PLANS_ENTITY = "subscription",
  INCOMES_ROUTE = "/api/incomes",
  INCOMES_ENTITY = "income",
}

export interface PayloadAPI<T> {
  id: number;
  payload: T;
}
export interface ResponseMutationAPI {
  message: string;
  id?: number;
}

export interface ResponseQueryAPI<T> {
  next: boolean;
  data: T[];
}

export interface MusclesGroupTable {
  muscles_group_id?: number;
  muscles_group_name: string;
}

// export interface NotesTable {
//   note_id?: number;
//   note_topic: string | null;
//   note_text: string | null;
// }

export interface LeadsTableAPI {
  lead_id?: number;
  date_lead: Date;
  first_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  status: boolean;
  note_topic: string | null;
  note_text: string | null;
}
export interface CitiesTable {
  city_id?: number;
  city_name: string;
  district?: string | null;
  population?: number | null;
}

export interface LocationsTable {
  city_id: number;
  location_id: number;
  street?: string | null;
}

export interface ProvidersTable {
  location_id: number;
  provider_name: string;
  provider_id?: number;
}

export interface WeeksTable {
  date: Date;
  day: number;
  week_id?: number;
  weight?: number | null;
}

export interface ExpensesTable {
  date: Date;
  expense_id?: number;
  expenses_amount: number;
  note_topic: string | null;
  note_text: string | null;
  product_id: number;
  seller_id: number;
}

export interface EquipmentsTable {
  equipment_id?: number;
  equipment_name: string;
  brand: string;
  manufacture_year: number;
  expense_id?: number | null;
}

export interface ExercisesTableAPI {
  equipment_id?: number | null;
  exercise_name: string;
  exercise_id?: number;
  muscles_group_id: number;
}

export interface TrainingProgramsListTable {
  training_programs_list_id: number | null;
  profile_id: number;
  type_program?: string | null;
  date_start: Date;
  date_end?: Date | null;
  note_topic: string | null;
  note_text: string | null;
}

export interface TrainingProgramTable {
  training_program_row_id: number | null;
  training_programs_list_id?: number;
  exercise_id: number;
  sets: number;
  reps: string;
  rest: string;
  intensity: string;
  rpe: number;
  note_topic: string | null;
  note_text: string | null;
}

export interface NutritionProgramsListTable {
  nutrition_programs_list_id?: number;
  profile_id: number;
  type_program?: string | null;
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
export interface TraineesTable {
  profile_id?: number;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: Date;
  identify_num: string;
  location_id: number;
  email?: string | null;
  phone_number: string;
  date_join: Date;
  status: boolean;
}

export interface SubscriptionPlans {
  subscription_plan_id?: number;
  profile_id: number;
  plan_name: string;
  current_num_trainings: number;
  total_trainings: number;
  last_training: Date;
}

export type LocationsGetRes = LocationsTable &
  PickKey<CitiesTable, "city_name">;
export type TraineeGetRes = TraineesTable &
  PickKey<CitiesTable, "city_name"> &
  PickKey<LocationsTable, "street"> &
  PickKey<TrainingProgramsListTable, "training_programs_list_id"> &
  PickKey<NutritionProgramsListTable, "nutrition_programs_list_id">;

export type TraineesExtends = OmitKey<TraineeGetRes, "profile_id"> & {
  profile_id: number;
};

// export interface TrainingProgramsList extends TrainingProgramsListTable {
//   name_topi?: strin | nullg;
//   note_tex: string | nullningProgram: TrainingProgramExtends[];
// }

export interface TrainingProgramExtends {
  exercise_name: null | string;
  equipment_name: null | string;
  muscles_group_name: null | string;
  reps: null | string;
  sets: number | null;
  rest: null | string;
  intensity: string;
  rpe: number | null;
  exercise_note_text: null | string;
  exercise_topic_note: null | string;
}

// export type TrainingProgramsListExtends = OmitKey<
//   TrainingProgramsList,
//   "trainingProgram"
// >;

// export interface TraineeExtends {
//   trainees: OmitKey<TraineeGetRes, "profile_id"> & { profile_id: number };
//   training_programs_list: TrainingProgramsListExtends[];
//   nutrition_programs_list: any[];
//   // subscription: MemberExtends[];
// }

export interface TrainingProgramExercise {
  training_program_row_id: number;
  training_programs_list_id: number;
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
  TrainingProgramExercise,
  "equipment_name" | "muscles_group_name" | "exercise_name"
>;
