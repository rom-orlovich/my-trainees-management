import { Interface } from "readline";

/* eslint-disable no-unused-vars */
export interface TrainingProgramExercise {
  training_program_row_id: number;
  update_date: Date;
  training_programs_list_id: number;
  exercise_id: number;
  reps: string;
  sets: number;
  rest: string;
  intensity: string;
  rpe: number;
  note_topic: string;
  note_text: string;
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

export interface LeadsTableAPI {
  user_id?: number;
  lead_id?: number;
  lead_date: Date;
  first_name: string;
  last_name: string;
  gender: string;
  location_id: number;
  city_name?: string;
  birthday: Date;
  phone_number: string;
  email?: string;
  status: boolean;
  note_topic: string | null;
  note_text: string | null;
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
export interface SharedTraineesLeadsProps {
  birthday: Date;
  gender: string;
  city_name: string;
  status: boolean;
  lead_date?: Date;
  date_join?: Date;
}

export interface SharedIncomesExpensesProps {
  date: Date;
  total_price: number;
  product_name: string;
  first_name?: string;
  last_name?: string;
  amount: number;
  seller_name?: string;
}

export interface FinancesObj {
  incomes: number;
  expenses: number;
}

export type TimeLineDisplay = "weekly" | "monthly" | "months" | "years";

export type ChartTypes = "graph" | "distribution" | "all";

export enum GRAPH_TIME_LINE {
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

export type IncomesOrExpenses = "incomes" | "expenses";

export interface FinancesChartStatsDisplay {
  labelFormatted: string[];
  datasetsValues: {
    expenses: number[];
    incomes: number[];
  };
}
export interface FinancesDistributionStatsDisplay {
  labelFormatted: string[];
  datasetsValues: {
    amounts: number[];
    totalPrice: number[];
  };
}

export interface ProductData {
  amount: number;
  total_price: number;
}

export interface DistributionFinances {
  incomes: Record<string, ProductData>;
  expenses: Record<string, ProductData>;
}

export type SharedTraineesLeadsSumObj =
  | {
      leads: number;
      trainees?: undefined;
    }
  | {
      trainees: number;
      leads?: undefined;
    };

export type LeadTraineeType = "leads" | "trainees";
