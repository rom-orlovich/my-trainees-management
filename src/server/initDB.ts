import { readFileSync } from "fs";
import { client } from "./PGSql/DBConnectConfig";
import { TRAINEES_MANAGEMENT_SQL_PATH } from "./utilities/constants";

async function readFromSQLfileAndExecute(path: string) {
  const query = readFileSync(path, "utf8");
  await client.query(query);
}

// Create init trainees management db.

export async function initDB() {
  await readFromSQLfileAndExecute(TRAINEES_MANAGEMENT_SQL_PATH);
}
