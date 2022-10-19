import { UserRoles } from "./services/serviceAuth/utilities/authHelpers";
import { ErrorCustomizes } from "./services/serviceErrors/handleErrors";
import { TrainingProgramExercise } from "./services/serviceStatistics/controllers/handleInsertStatistics";

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
/* eslint-disable no-unused-vars */
export {};
declare global {
  namespace Express {
    export interface Request {
      logAlertInfo?: ModifiedActionResult;
      auth_data?: {
        username: string;
        user_id: number;
        jwt: string;
        role: UserRoles;
      };

      signUp_verify_trainee?: {
        profile_id: string;
        email: number;
        jwt: string;
      };

      signUp_data?: {
        role: UserRoles;
      };

      data_for_stats?: {
        tableName: string;
        trainingProgramExerciseData?: {
          trainingProgramExercise: TrainingProgramExercise;
        };
      };
    }
  }
}
