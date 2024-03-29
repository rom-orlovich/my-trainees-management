import * as yup from "yup";

export const musclesGroupSchema = yup.object().shape({
  user_id: yup.number().notRequired().nullable(),
  muscles_group_id: yup.number().notRequired().nullable(),
  muscles_group_name: yup.string().required(),
});

export const leadsSchema = yup.object().shape({
  user_id: yup.number().notRequired().nullable(),
  lead_id: yup.number().notRequired().nullable(),
  lead_date: yup.date().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  gender: yup.string().required(),
  location_id: yup.number().required(),
  birthday: yup
    .date()
    .required()
    .max(new Date(2010, 1, 1), "Min age is 12 years old."),
  phone_number: yup.string().required(),
  email: yup.string().email().notRequired().nullable(),
  status: yup.boolean().required(),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});
export const citiesSchema = yup.object().shape({
  user_id: yup.number().notRequired().nullable(),
  city_id: yup.number().notRequired().nullable(),
  city_name: yup.string().required(),
  district: yup.string().required(),
  population: yup.number().required(),
});

export const locationsSchema = yup.object().shape({
  user_id: yup.number().notRequired().nullable(),
  location_id: yup.number().notRequired().nullable(),
  city_id: yup.number().required(),
  street: yup.string().notRequired().nullable(),
});

export const providersSchema = yup.object().shape({
  user_id: yup.number().notRequired().nullable(),
  provider_id: yup.number().notRequired().nullable(),
  provider_name: yup.string().required(),
  location_id: yup.number().required(),
});

export const equipmentSchema = yup.object().shape({
  user_id: yup.number().notRequired().nullable(),
  equipment_id: yup.number().notRequired().nullable(),
  equipment_name: yup.string().required(),
  brand: yup.string().required(),
  manufacture_year: yup.number().required(),
  // expense_id: yup.number().notRequired().nullable(),
});

export const exercisesListSchema = yup.object().shape({
  user_id: yup.number().notRequired().nullable(),
  exercise_id: yup.number().notRequired().nullable(),
  exercise_name: yup.string().required(),
  muscles_group_id: yup.number().notRequired().nullable(),
  equipment_id: yup.number().notRequired().nullable(),
});

export const trainingProgramsListSchema = yup.object().shape({
  training_programs_list_id: yup.number().notRequired().nullable(),
  trainee_id: yup.number().required(),
  program_type: yup.string().required(),
  date_start: yup.date().required(),
  date_end: yup
    .date()
    .notRequired()
    .nullable()
    .min(yup.ref("date_start"), "End date can't be before start date."),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});

export const trainingProgramSchema = yup.object().shape({
  training_program_row_id: yup.number().notRequired().nullable(),
  training_programs_list_id: yup.number().required(),
  update_date: yup.date().required(),
  exercise_id: yup.number().required(),
  rest: yup
    .string()
    .required()
    .matches(/min/g, { message: "Please include 'min' unites." }),
  sets: yup.number().required(),
  reps: yup
    .string()
    .required()
    .oneOf(
      ["1", "3-5", "6-8", "8-10", "10-12", "12-15"],
      "Please enter valid range of reps: 1, 3-5, 6-8, 8-10, 10-12, 12-15."
    ),
  intensity: yup
    .string()
    .required()
    .matches(/kg/g, { message: "Please include kg unites." }),
  rpe: yup
    .number()
    .required()
    .min(1)
    .max(10)
    .typeError({ message: "RPE is number between 1 and 10." }),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});

export const trainingProgramExerciseStatsSchema = yup.object().shape({
  training_program_row_id: yup.number().notRequired().nullable(),
  exercise_id: yup.number().required(),
  rest: yup.number().required(),
  sets: yup.number().required().min(1, "Min number of sets is 1"),
  reps: yup
    .string()
    .required()
    .oneOf(
      ["1", "3-5", "6-8", "8-10", "10-12", "12-15"],
      "Please enter valid range of reps: 1, 3-5, 6-8, 8-10, 10-12, 12-15."
    ),
  intensity: yup.number().required().min(1, "Min number of intensity is 1"),
  rpe: yup
    .number()
    .required()
    .min(1)
    .max(10)
    .typeError({ message: "RPE is number between 1 and 10." }),
});

export const nutritionMenusListSchema = yup.object().shape({
  nutrition_menu_id: yup.number().notRequired().nullable(),
  profile_id: yup.number().required(),
  date_start: yup.date().required(),
  date_end: yup
    .date()
    .notRequired()
    .nullable()
    .min(yup.ref("date_start"), "End date can't be before start date."),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});
export const nutritionMenuSchema = yup.object().shape({
  nutrition_menu_id: yup.number().notRequired().nullable(),
  meal_id: yup.number().notRequired().nullable(),
});

export const nutritionProgramSchema = yup.object().shape({
  nutrition_program_id: yup.number().notRequired().nullable(),
  nutrition_program_list_id: yup.number().required(),
  week_id: yup.number().required(),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
});

export const nutritionQuestionnaireSchema = yup.object().shape({
  // user_id: yup.number().notRequired().nullable(),
  // allergens: yup.array().of(yup.string().oneOf(ALLERGENS_LIST)),
  // black_list_foods: yup.array(),
  // favorite_foods: yup.array(),
  // profile_id: yup.number().required("Must be a number"),
  // date_start: yup.date().required(),
  // date_end: yup
  //   .date()
  //   .notRequired()
  //   .nullable()
  //   .min(yup.ref("date_start"), "End date can't be before start date."),
  // kosher: yup.boolean(),
  // is_vegan: yup.boolean(),
  // is_vegetarian: yup.boolean(),
  // is_keep_meat_milk: yup.boolean(),
  // diet_type: yup.string(),
  // meals_calories_size_percents: yup.array(),
});

export const measuresSchema = yup.object().shape({
  measure_id: yup.number().notRequired().nullable(),
  date: yup.date().required(),
  weight: yup.number().required().min(1, "Must be positive"),
  height: yup.number().required().min(1, "Must be positive"),
  activity_factor: yup
    .number()
    .notRequired()
    .min(28)
    .max(32)
    .typeError({ message: "Activity Factor is number between 28 and 32." }),
  fat_percents: yup
    .number()
    .notRequired()
    .nullable()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .min(1, "Must be positive"),
  protein_per_kg: yup
    .number()
    .notRequired()
    .min(0, "Must be positive")
    .default(1.8),
  fat_per_kg: yup
    .number()
    .notRequired()
    .min(0, "Must be positive")
    .default(0.5),
  fixed_cals: yup.number().notRequired().default(0),
});

export const traineesSchema = yup.object().shape({
  user_id: yup.number().notRequired().nullable(),
  trainer_user_id: yup.number().notRequired().nullable().default(1),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  gender: yup.string().required(),
  identify_num: yup.number().required(),
  birthday: yup
    .date()
    .required()
    .max(new Date(2010, 1, 1), "Min age is 12 years old."),
  email: yup.string().email().notRequired().nullable(),
  phone_number: yup.string().max(12).required(),
  location_id: yup.number().required(),
  date_join: yup.date().required(),
  status: yup.boolean().required(),
});

export const subscriptionPlansSchema = yup.object().shape({
  subscription_plan_id: yup.number().notRequired().nullable(),
  trainee_id: yup.number().required(),
  product_id: yup.number().required(),
  current_num_trainings: yup
    .number()
    .required()
    .min(0, "Current Number Training must be positive."),
  total_trainings: yup
    .number()
    .required()
    .min(
      yup.ref("current_num_trainings"),
      "Training total must be bigger than training remain."
    ),
  last_training: yup.date().required(),
});

export const incomesSchema = yup.object().shape({
  income_id: yup.number().notRequired().nullable(),
  product_id: yup.number().required(),
  date: yup.date().required(),
  buyer_id: yup.number().required(),
  amount: yup.number().default(1),
  total_price: yup
    .number()
    .required()
    .min(1, "Total price must be a positive value"),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
  user_id: yup.number().notRequired().nullable(),
});

export const expensesSchema = yup.object().shape({
  expense_id: yup.number().notRequired().nullable(),
  product_id: yup.number().required(),
  date: yup.date().required(),
  seller_name: yup.string().required(),
  amount: yup.number().default(1),
  total_price: yup
    .number()
    .required()
    .min(1, "Total price must be a positive value"),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
  user_id: yup.number().notRequired().nullable(),
});

export const productSchema = yup.object().shape({
  product_id: yup.number().notRequired(),
  product_name: yup.string().required(),
  product_type: yup.string().required(),
  max_training: yup
    .number()
    .notRequired()
    .transform((value) => (Number.isNaN(value) ? undefined : value)),
  price: yup.number().required().min(1, "Total price must be a positive value"),
  user_id: yup.number().notRequired().nullable(),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
export const signUpSchema = loginSchema.concat(
  yup.object().shape({ email: yup.string().email().required() })
);

export const changeUserCredSchema = yup.object().shape({
  password: yup.string().notRequired().nullable(),
});
export const emailVerifySchema = signUpSchema.omit(["username", "password"]);

export const activitySchema = yup.object().shape({
  activity_id: yup.number().notRequired().nullable(),
  activity_name: yup.string().required(),
  user_id: yup.number().notRequired().nullable(),
});

export const participantsGroupSchema = yup.object().shape({
  participants_group_id: yup.number().notRequired().nullable(),
  participants_groups_list_id: yup.number().required(),
  trainee_id: yup.number().required(),
  user_id: yup.number().notRequired().nullable(),
});

export const participantsGroupListSchema = yup.object().shape({
  participants_groups_list_id: yup.number().notRequired().nullable(),
  is_private: yup.boolean().required(),
  group_name: yup.string().required(),
  user_id: yup.number().notRequired().nullable(),
});

export const meetingsSchema = yup.object().shape({
  meeting_id: yup.number().notRequired().nullable(),
  date_start: yup.date().required(),
  date_end: yup
    .date()
    .notRequired()
    .nullable()
    .min(yup.ref("date_start"), "End date can't be before start date."),
  participants_groups_list_id: yup.number().required(),
  activity_id: yup.number().required(),
  location_id: yup.number().required(),
  note_topic: yup.string().notRequired().default(""),
  note_text: yup.string().notRequired().default(""),
  user_id: yup.number().notRequired().nullable(),
});
export const foodsSchema = yup.object().shape({
  food_id: yup.number().notRequired().nullable(),
  food_name: yup.string().required(),
  calories_total: yup.number().required(),
  protein_g: yup.number().required(),
  protein_cals: yup.number().required(),
  carbs_g: yup.number().required(),
  carbs_cals: yup.number().required(),
  sugars_g: yup.number().required(),
  fat_g: yup.number().required(),
  fat_cals: yup.number().required(),
  saturated_fat: yup.number().required(),
  cholesterol_mg: yup.number().required(),
  sodium_mg: yup.number().required(),
  nutrient_type: yup
    .string()
    .oneOf(
      ["protein", "fats", "carbohydrates"],
      "Please enter protein/fats/carbohydrates."
    ),
  allergens: yup.array().required(),
  kosher: yup.boolean().required(),
  kosher_type: yup
    .string()
    .oneOf(["פרווה", "בשרי", "חלבי"], "Please enter פרווה/בשרי/חלבי"),
});
