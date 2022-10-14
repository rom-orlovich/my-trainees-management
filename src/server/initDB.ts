import { readFileSync } from "fs";
import { client } from "./PGSql/DBConnectConfig";
import { createUser } from "./services/serviceAuth/utilities/authHelpers";
import {
  CREATE_DB_TABLE_SQL_FILE_PATH,
  CREATE_DUMMY_DATA_FILE_PATH,
} from "./utilities/constants";

async function readFromSQLfileAndExecute(path: string) {
  const query = readFileSync(path, "utf8");
  await client.query(query);
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
}
