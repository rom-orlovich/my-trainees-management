/* eslint-disable import/first */
import { config } from "dotenv";

// eslint-disable-next-line prettier/prettier
import { readFileSync } from "fs";
import { client } from "./PGSql/DBConnectConfig";
import {
  FOOD_DICT_DB_PATH,
  JSON_ENCODING_DEFAULT,
} from "./services/foodDataScraperService/constants";
import { createUser } from "./services/serviceAuth/utilities/authHelpers";
import {
  CREATE_DB_TABLE_SQL_FILE_PATH,
  CREATE_DUMMY_DATA_FILE_PATH,
} from "./utilities/constants";

async function readFromSQLfileAndExecute(path: string) {
  const query = readFileSync(path, "utf8");
  await client.query(query);
}

async function readFoodsDB() {
  const foodsJSON = readFileSync(FOOD_DICT_DB_PATH, JSON_ENCODING_DEFAULT);
  await client.query(
    "INSERT INTO foods select * from json_populate_recordset(null::foods,$1)",
    [foodsJSON]
  );
}

// Create init trainees management db.

export async function initDB() {
  await readFromSQLfileAndExecute(CREATE_DB_TABLE_SQL_FILE_PATH);
  await createUser(
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_USER,
    process.env.ADMIN_PSW,
    "admin"
  );
  await createUser(
    process.env.TRAINER_EMAIL,
    process.env.TRAINER_USER,
    process.env.TRAINER_PSW,
    "trainer"
  );
  await createUser(
    process.env.TRAINEE_EMAIL,
    process.env.TRAINEE_USER,
    process.env.TRAINEE_PSW,
    "trainee"
  );

  await readFromSQLfileAndExecute(CREATE_DUMMY_DATA_FILE_PATH);
  await readFoodsDB();
}

readFoodsDB();
