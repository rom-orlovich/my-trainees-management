import { UserRoles } from "./services/serviceAuth/controllers/handleAuth";
import { ErrorCustomizes } from "./services/serviceErrors/handleErrors";

/* eslint-disable no-unused-vars */
export {};
declare global {
  namespace Express {
    export interface Request {
      modifiedActionResult?: {
        message?: string;
        successRes?: { data: any; statusCode?: number };
        error?: InstanceType<typeof ErrorCustomizes>;
        logAlert?: boolean;
      };
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
