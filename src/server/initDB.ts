import { readFileSync } from "fs";
import { client } from "./PGSql/DBConnectConfig";
import { CREATE_DB_TABLE_SQL_FILE } from "./utilities/constants";

async function readFromSQLfileAndExecute(path: string) {
  const query = readFileSync(path, "utf8");
  await client.query(query);
}

// Create init trainees management db.

export async function initDB() {
  await readFromSQLfileAndExecute(CREATE_DB_TABLE_SQL_FILE);
}
