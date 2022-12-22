import { UserRoles } from "./services/authService/utilities/authHelpers";
import { ErrorCustomizes } from "./services/errorsService/errorsService";

import { TrainingProgramExercise } from "./services/statisticService/serviceStatisticsTypes";

export interface ModifiedActionResult {
  successRes?: {
    message?: string;
    data: any;
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

export interface GetRes<T = Record<string, any>> {
  data: T[];
  next: boolean;
  countRows: number;
}

export interface StatsData {
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
