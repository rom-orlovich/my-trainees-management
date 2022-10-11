import express from "express";
import {
  handleGetUser,
  handleSendEmail,
} from "../controllers/handleMailService";

const mailRouter = express.Router();

mailRouter.get("/user/:email", handleGetUser);
mailRouter.get("/send", handleSendEmail);
// mailRouter.get("drafts/:email", getDrafts);
// mailRouter.get("read/:messageId", readMail);

export default mailRouter;
