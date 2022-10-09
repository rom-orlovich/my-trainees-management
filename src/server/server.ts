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

import {
  PERMISSION_ALL_WITHOUT_UPDATE,
  routesCRUDArr,
} from "./services/serviceCRUD/routes/routesConfig";
import { createCRUDroutes } from "./services/serviceCRUD/routes/routesCRUD";
import { errorHandlerMiddleware } from "./services/serviceErrors/handleErrors";
import {
  handleAlertsMiddleware,
  handleDeleteAllUserAlerts,
} from "./services/serviceAlerts/handleAlerts";
import { API_ROUTES } from "./services/apiRoutesConstants";

import authRouter from "./services/serviceAuth/routes/authRouter";
import {
  validateRolePermission,
  validateTokenMiddleware,
} from "./services/serviceAuth/controllers/authMiddleware";
import { createUser } from "./services/serviceAuth/utilities/authHelpers";

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
  app.use(
    baseRoute,
    validateTokenMiddleware,
    validateRolePermission(optionsCRUD.permissions),
    createCRUDroutes(optionsCRUD)
  );
});
app.delete(
  API_ROUTES.ALERT_ROUTE,
  validateTokenMiddleware,
  validateRolePermission(PERMISSION_ALL_WITHOUT_UPDATE),
  handleDeleteAllUserAlerts
);

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
    // await createUser(process.env.ADMIN_PSW, process.env.ADMIN_USER, "admin");
    // await createUser(
    //   process.env.EXAMPLE_PSW,
    //   process.env.EXAMPLE_USER,
    //   "trainer"
    // );

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
