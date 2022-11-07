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
