/* eslint-disable no-unused-vars */

import { Client, ClientConfig } from "pg";

// NOTE: Changing the mode of NODE_ENV can change the db location local db or remote db.
// The options are: "development" | "production"
const configClient: ClientConfig =
  process.env.NODE_ENV === "development"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.HOST_PG || "",
        database: process.env.DB_NAME_PG || "",
        port: Number(process.env.PORT_PG),
        user: process.env.USER_PG || "",
        password: process.env.PASSWORD || "",
      };

export const client = new Client(configClient);
