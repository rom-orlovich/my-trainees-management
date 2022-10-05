import { UserRoles } from "./services/serviceAuth/controllers/handleAuth";
import { ErrorCustomizes } from "./services/serviceErrors/handleErrors";

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
      modifiedActionResult?: ModifiedActionResult;
      auth_data: {
        username: string;
        user_id: number;
        jwt: string;
        role: UserRoles;
      };
      signUp_data: {
        role: UserRoles;
      };
    }
  }
}
