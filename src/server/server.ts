/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { config } from "dotenv";

config();
import cookiesParser from "cookie-parser";

import express from "express";
import cors from "cors";
import path from "path";

import { Server } from "http";

import { client } from "./PGSql/DBConnectConfig";
import { initDB } from "./initDB";

import { routesCRUDArr } from "./services/serviceCRUD/routes/routesConfig";
import { createCRUDroutes } from "./services/serviceCRUD/routes/routesCRUD";
import { errorHandlerMiddleware } from "./services/serviceErrors/handleErrors";
import { handleAlertsMiddleware } from "./services/serviceAlerts/handleAlerts";
import { API_ROUTES } from "./services/apiRoutesConstants";

import authRouter from "./services/serviceAuth/routes/authRouter";
import { validateTokenMiddleware } from "./services/serviceAuth/controllers/authMiddleware";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://10.100.102.74:3000",
      "https://my-trainees-management.herokuapp.com/",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Init all the routes of the app.
routesCRUDArr.forEach(({ baseRoute, optionsCRUD }) => {
  app.use(baseRoute, validateTokenMiddleware, createCRUDroutes(optionsCRUD));
});

app.use(API_ROUTES.API_AUTH_ROUTE, authRouter);

app.use(handleAlertsMiddleware);
app.use(errorHandlerMiddleware);

let server: Server;

// Connects to the psSQL database and initializes the server listen to port 5000.
async function connectDB() {
  try {
    await client.connect();
    client.on("error", (err) => {
      console.error("something bad has happened!", err.stack);
    });
    console.log(`Connected pgSQL server.`);

    // Uncomment this line will init the  db.
    // This line is for development purpose.
    // await initDB();

    server = app.listen(PORT, () => {
      console.log(`listen port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    if (server)
      server.close(() => {
        console.log("server is closed");
      });
    // client.end();
  }
}

connectDB();
if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, "client");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}
app.use("*", (req, res) => res.status(404).send("page not found"));
