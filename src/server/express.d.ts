import { UserRoles } from "./services/authService/utilities/authHelpers";
import { ErrorCustomizes } from "./services/errosService/handleErrors";
import { TrainingProgramExercise } from "./services/statisticService/serviceStatisticsTypes";

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

export interface GetRes<T = Record<string, any>> {
  data: T[];
  next: boolean;
  countRows: number;
}

export interface StatsData<T = Record<string, any>> {
  updateExerciseData?: TrainingProgramExercise;
  statsResult?: GetRes | GetRes[];
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
      querySelectLogicAddOns?: string;
    }
  }
}
