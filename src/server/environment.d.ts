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
      ADMIN_USER: string;
      ADMIN_PSW: string;
      EXAMPLE_USER: string;
      EXAMPLE_PSW: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      EXPIRE_IN_ACCESS_TOKEN: string;
      EXPIRE_IN_REFRESH_TOKEN: string;
    }
  }
}
