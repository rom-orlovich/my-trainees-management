/* eslint-disable no-unused-vars */
export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
      PORT: number;
      MONGO_DB_URL: string;
      DATABASE_URL: string;
      USER_PG: string;
      PASSWORD: string;
      PORT_PG: number;
      DB_NAME_PG: string;
      HOST_PG: string;
    }
  }
}
