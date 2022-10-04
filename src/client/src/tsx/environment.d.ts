/* eslint-disable no-unused-vars */
export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
      SUBTRACT_EXPIRE_TIME: string | undefined;
    }
  }
}
