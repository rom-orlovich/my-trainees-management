import { ErrorCustomizes } from "./controllers/handleErrors";

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
    }
  }
}
