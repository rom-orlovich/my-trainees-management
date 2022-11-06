import { UserRoles } from "./services/serviceAuth/utilities/authHelpers";
import { ErrorCustomizes } from "./services/serviceErrors/handleErrors";
import { TrainingProgramExercise } from "./services/serviceStatistics/utilities/helpersStatisticsService";

export interface ModifiedActionResult {
  successRes?: {
    response: {
      message?: string;
      data: any;
    };
    statusCode?: number;
  };

  error?: ErrorCustomizes<
    Partial<Error> & {
      detail?: string;
      code?: string;
    }
  >;

  logAlert?: boolean;
}

export interface TrainingProgramExerciseStatsAPI {
  training_program_row_id: number;
  update_date: Date;
  exercise_id: number;
  reps: string;
  sets: number;
  rest: number;
  intensity: number;
  rpe: number;
}

export interface newMeasureRes {
  protein_g: number;
  fat_g: number;
  crabs_g: number;
  protein_cals: number;
  fat_cals: number;
  crabs_cals: number;
  calories_total: number;
  measure_id?: number;
  date: Date;
  height: number;
  fat_percents?: number;
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

export interface getRes<T extends Record<string, any>> {
  data: T[];
  next: boolean;
  countRows: number;
}

export interface StatsData {
  updateExerciseData?: TrainingProgramExercise;
  statsResult?: {
    exerciseStats?: getRes<TrainingProgramExerciseStatsAPI>;
    measures?: getRes<MeasuresCalResAPI>;
  };
}
/* eslint-disable no-unused-vars */
export {};
declare global {
  namespace Express {
    export interface Request {
      logAlertInfo?: ModifiedActionResult;
      auth_data?: {
        username: string;
        user_id: number;
        trainer_user_id?: number;
        jwt: string;
        role: UserRoles;
      };

      signUpData?: {
        role: UserRoles;
      };

      statsData?: StatsData;
    }
  }
}
