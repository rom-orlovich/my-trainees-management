/* eslint-disable no-unused-vars */

import { RequestHandler } from "express";
import {
  createModifiedActionResultFun,
  createUser,
} from "../utilities/authHelpers";

export const signUpHandlerTrainer: RequestHandler = async (req, res, next) => {
  if (req.modifiedActionResult?.error) return next();

  const { password, username, email } = req.body;
  if (!req?.signUp_data?.role) {
    req.modifiedActionResult = createModifiedActionResultFun(
      undefined,
      { message: "Role is undefined" },
      "create",
      false
    );
    return next();
  }
  const [user, error] = await createUser(
    email || "",
    username,
    password,
    "trainer"
  );

  // Continue to the alert handler.
  req.modifiedActionResult = createModifiedActionResultFun(
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
