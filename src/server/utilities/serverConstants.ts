import { join } from "path";
import { cwd } from "process";

export const CREATE_DB_TABLE_SQL_FILE = "create_db_tables.sql";
export const CREATE_DUMMY_DATA_SQL_FILE = "dummy_data.sql";

export const DB_FOLDER_PATH = join(cwd(), "db");
export const CREATE_DB_TABLE_SQL_FILE_PATH = join(
  DB_FOLDER_PATH,
  CREATE_DB_TABLE_SQL_FILE
);
export const CREATE_DUMMY_DATA_FILE_PATH = join(
  DB_FOLDER_PATH,
  CREATE_DUMMY_DATA_SQL_FILE
);
export const IS_DEVELOPMENT_MODE = process.env.NODE_ENV === "development";
