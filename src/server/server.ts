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

import { errorHandlerMiddleware } from "./services/serviceErrors/handleErrors";
import { handleAlertsMiddleware } from "./services/serviceAlerts/handleAlerts";
import {
  API_ROUTES,
  URL_HEROKU_CLIENT,
  URL_REACT_CLIENT,
} from "./services/apiRoutesConstants";

import authRouter from "./services/serviceAuth/routes/authRouter";
import { routesConfigArr } from "./services/serviceCRUD/routes/routersCRUDapp";

const PORT = process.env.PORT || 5000;

export const app = express();
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors middleware.
app.use(
  cors({
    origin: [URL_HEROKU_CLIENT, URL_REACT_CLIENT],
    credentials: true,
  })
);

// Init auth route.
app.use(API_ROUTES.API_AUTH_ROUTE, authRouter);

// Init all CRUD routes of the app.
routesConfigArr.forEach(({ baseRoute, router }) => {
  app.use(baseRoute, router);
});

// Init alerts middleware.
app.use(handleAlertsMiddleware);

// Init Error route.
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
