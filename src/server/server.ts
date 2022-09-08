/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { config } from "dotenv";

config();
import express from "express";
import cors from "cors";
import path from "path";

import { Server } from "http";
import { client } from "./PGSqlDB/PGSqlConfig";
import { initDB } from "./createDBpgsql";
import { checkIfTableExist } from "./PGSqlDB/PGSqlHelpers";

import { INCOMES_TABLE_NAME } from "./utilites/constants";

import { routesCRUDArr } from "./routes/routesConfig";
import { createCRUDroutes } from "./routes/routesCRUD";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Init all the routes of the app.
routesCRUDArr.forEach(({ baseRoute, optionsCRUD }) => {
  app.use(baseRoute, createCRUDroutes(optionsCRUD));
});
let server: Server;

// Connects to the pgSQLDB and initilizes the server listen to port 5000.
client
  .connect()
  .then(async () => {
    console.log(`Connected pgSQL server.`);

    // Check if the socks table is exist, otherwise we have to initDB function.
    if (!checkIfTableExist(INCOMES_TABLE_NAME))
      throw Error("Please init the function initDB in createDBpgsql.ts.");
    else console.log("The army inventory's DB is initialize.");

    // Uncomment this line will init the db.
    // This line is for development purpose.
    // await initDB();

    server = app.listen(PORT, () => {
      console.log(`listen port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log(err);
    server.close(() => {
      console.log("server is closed");
    });
    client.end();
  });

if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, "client");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}
app.use("*", (req, res) => res.status(404).send("page not found"));
