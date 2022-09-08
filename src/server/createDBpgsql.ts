import { readFileSync } from "fs";
import { client } from "./PGSqlDB/PGSqlConfig";
import { TRAINEES_MANAGEMENT_SQL_PATH } from "./utilites/constants";

async function readFromSQLfileAndExcute(path: string) {
  const query = readFileSync(path, "utf8");
  await client.query(query);
}

// Create init trainees management db.

export async function initDB() {
  await readFromSQLfileAndExcute(TRAINEES_MANAGEMENT_SQL_PATH);
}
