import { ErrorCustomizes } from "./controllers/handleErrors";

/* eslint-disable no-unused-vars */
export {};
declare global {
  namespace Express {
    export interface Request {
      modifiedActionResult?: {
        message?: string;
        data?: any;
        error?: InstanceType<typeof ErrorCustomizes>;
      };
    }
  }
}
