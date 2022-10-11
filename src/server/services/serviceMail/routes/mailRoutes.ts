const express = require("express");
const controllers = require("./controllers");

const mailRouter = express.Router();

mailRouter.get("user/:email", controllers.getUser);
mailRouter.get("send", controllers.sendMail);
mailRouter.get("drafts/:email", controllers.getDrafts);
mailRouter.get("read/:messageId", controllers.readMail);

export default mailRouter;
