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
import winstonExpress from "express-winston";

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
import { routesConfigArr } from "./services/serviceCRUD/routes/routersCRUDArr";
import {
  requestLogger,
  logger,
  winstonExpressOption,
} from "./services/loggerService/logger";

const PORT = process.env.PORT || 5000;

export const app = express();
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(winstonExpress.logger(winstonExpressOption));

winstonExpress.requestWhitelist.push("body");
winstonExpress.responseWhitelist.push("body");
winstonExpress.bodyBlacklist.push("password", "psw");

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

app.use(
  winstonExpress.errorLogger({
    winstonInstance: requestLogger,
  })
);

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
      logger.error("something bad has happened!", err.stack, __filename);
      client.end(() => {
        logger.error("close PostgreSQL client connection");
      });
    });

    logger.log("info", `Connected pgSQL server.`, { __filename });

    // Uncomment this line will init the  db.
    // This line is for development purpose.
    // await initDB();

    server = app.listen(PORT, () => {
      logger.log("info", `listen port ${PORT}`, __filename);
    });
  } catch (error) {
    logger.error(error);
    if (server)
      server.close(() => {
        logger.log("info", "server is closed", __filename);
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
