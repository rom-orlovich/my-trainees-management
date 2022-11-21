/* eslint-disable no-unused-vars */

import { Client, ClientConfig } from "pg";

const HEROKU_CONNECTION = {
  connectionString: process.env.HEROKU_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 0,
};

const RENDER_EXTERNAL_CONNECTION = {
  connectionString: process.env.EXTERNAL_RENDER_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 0,
};
const RENDER_INTERNAL_CONNECTION = {
  connectionString: process.env.INTERNAL_RENDER_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 0,
};

const LOCAL_CONNECTION = {
  host: process.env.HOST_PG || "",
  database: process.env.DB_NAME_PG || "",
  port: Number(process.env.PORT_PG),
  user: process.env.USER_PG || "",
  password: process.env.PASSWORD || "",
};

// NOTE: Changing the mode of NODE_ENV can change the db location local db or remote db.
// The options are:  "development" | "production"

const configClient: ClientConfig =
  process.env.NODE_ENV === "production"
    ? RENDER_INTERNAL_CONNECTION
    : LOCAL_CONNECTION;

export const client = new Client(configClient);
