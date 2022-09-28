import { ErrorCustomizes } from "./controllers/handleErrors";

/* eslint-disable no-unused-vars */
export {};
declare global {
  namespace Express {
    export interface Request {
      modifiedActionResult?: {
        successStatusCode?: number;
        message?: string;
        data?: any;
        error?: InstanceType<typeof ErrorCustomizes>;
        logAlert?: boolean;
      };
    }
  }
}
