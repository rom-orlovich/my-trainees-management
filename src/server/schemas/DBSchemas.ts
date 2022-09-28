import * as yup from "yup";

export const musclesGroupSchema = yup.object().shape({
  muscles_group_id: yup.number().notRequired().nullable(),
  muscles_group_name: yup.string().required(),
});

export const leadsSchema = yup.object().shape({
  lead_id: yup.number().notRequired().nullable(),
  date_lead: yup.date().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone_number: yup.string().required(),
  email: yup.string().email().notRequired().nullable(),
  status: yup.boolean().required(),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});
export const citiesSchema = yup.object().shape({
  city_id: yup.number().notRequired().nullable(),
  city_name: yup.string().required(),
  district: yup.string().required(),
  population: yup.number().required(),
});

export const locationsSchema = yup.object().shape({
  location_id: yup.number().notRequired().nullable(),
  city_id: yup.number().required(),
  street: yup.string().notRequired().nullable(),
});

export const providersSchema = yup.object().shape({
  provider_id: yup.number().notRequired().nullable(),
  provider_name: yup.string().required(),
  location_id: yup.number().required(),
});

export const weeksSchema = yup.object().shape({
  week_id: yup.number().notRequired().nullable(),
  day: yup.number().required(),
  date: yup.date().required(),
  weight: yup.number().notRequired().nullable(),
});

export const expensesSchema = yup.object().shape({
  expense_id: yup.number().notRequired().nullable(),
  product_id: yup.number().required(),
  date: yup.date().required(),
  seller_id: yup.number().required(),
  expenses_amount: yup.number().required(),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});

export const equipmentSchema = yup.object().shape({
  equipment_id: yup.number().notRequired().nullable(),
  equipment_name: yup.string().required(),
  brand: yup.string().required(),
  manufacture_year: yup.number().required(),
  expense_id: yup.number().notRequired().nullable(),
});

export const exercisesListSchema = yup.object().shape({
  exercise_id: yup.number().notRequired().nullable(),
  exercise_name: yup.string().required(),
  muscles_group_id: yup.number().notRequired().nullable(),
  equipment_id: yup.number().notRequired().nullable(),
});

export const trainingProgramsListSchema = yup.object().shape({
  training_programs_list_id: yup.number().notRequired().nullable(),
  profile_id: yup.number().required(),
  type_program: yup.string().required(),
  date_start: yup.date().required(),
  date_end: yup
    .date()
    .notRequired()
    .nullable()
    .min(yup.ref("date_start"), "End date can't be before start date"),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});

export const trainingProgramSchema = yup.object().shape({
  training_program_row_id: yup.number().notRequired().nullable(),
  training_programs_list_id: yup.number().required(),
  exercise_id: yup.number().required(),
  rest: yup.string().required(),
  sets: yup.number().required(),
  reps: yup.string().required(),
  intensity: yup.string().required(),
  rpe: yup.number().required().max(10).min(1),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});

export const nutritionProgramsListSchema = yup.object().shape({
  nutrition_programs_list_id: yup.number().notRequired().nullable(),
  profile_id: yup.number().required(),
  type_program: yup.string().required(),
  date_start: yup.date().required(),
  date_end: yup
    .date()
    .notRequired()
    .nullable()
    .min(yup.ref("date_start"), "End date can't be before start date"),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});
export const nutritionProgramSchema = yup.object().shape({
  nutrition_program_id: yup.number().notRequired().nullable(),
  nutrition_program_list_id: yup.number().required(),
  week_id: yup.number().required(),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});

export const traineesSchema = yup.object().shape({
  profile_id: yup.number().notRequired().nullable(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  gender: yup.string().required(),
  identify_num: yup.string().required(),
  birthday: yup.date().required(),
  email: yup.string().email().notRequired().nullable(),
  phone_number: yup.string().max(12).required(),
  location_id: yup.number().required(),
  date_join: yup.date().required(),
  status: yup.boolean().required(),
});

export const subscriptionPlansSchema = yup.object().shape({
  subscription_plan_id: yup.number().notRequired().nullable(),
  profile_id: yup.number().required(),
  plan_name: yup.string().required(),
  current_num_trainings: yup
    .number()
    .required()
    .min(0, "Current Number Training must be positive"),
  total_trainings: yup
    .number()
    .required()
    .min(
      yup.ref("current_num_trainings"),
      "Training total must be bigger than training remain"
    ),
  last_training: yup.date().required(),
});

export const incomesSchema = yup.object().shape({
  income_id: yup.number().notRequired().nullable(),
  income_name: yup.string().required(),
  date: yup.date().required(),
  buyer_id: yup.number().required(),
  incomes_amount: yup.number().required(),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
