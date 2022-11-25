/* eslint-disable no-unused-vars */

import { RequestHandler } from "express";
import { prepareLogAlert, createUser } from "../utilities/authHelpers";

export const signUpHandlerTrainer: RequestHandler = async (req, res, next) => {
  if (req.logAlertInfo?.error) return next();

  const { password, username, email } = req.body;

  const [user, error] = await createUser(
    email || "",
    username,
    password,
    "trainer"
  );

  // Continue to the alert handler.
  req.logAlertInfo = prepareLogAlert(
    {
      data: { username },
      statusCode: 201,
      messagePayload: username,
      sendDataID: true,
    },
    error,
    "create",
    false
  );

  return next();
};
