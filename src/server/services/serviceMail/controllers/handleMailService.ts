import { RequestHandler } from "express";
import axios from "axios";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import {
  clientMailOAuth,
  MAIL_OPTIONS,
  MY_USER_MAIL,
} from "../utilities/contstans";
import { API_ROUTES, URL_CUR_CLIENT } from "../../apiRoutesConstants";

export const generateConfig = (url: string, accessToken: string) => ({
  method: "get",
  url,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-type": "application/json",
  },
});

export const handleGetUser: RequestHandler = async (req, res) => {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
    const { token } = await clientMailOAuth.getAccessToken();
    console.log("token", token);
    if (token) {
      const config = generateConfig(url, token);
      console.log("config", config);
      const response = await axios(config);
      res.json(response.data);
      console.log(response.data);
    } else res.sendStatus(401);
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
};

// export const sendEmail = (to: string,) => {

// };

export const handleSendEmail: RequestHandler = async (req, res) => {
  console.log("enter");
  try {
    const { token } = await clientMailOAuth.getAccessToken();
    console.log("token", token);
    const link = `${URL_CUR_CLIENT}${API_ROUTES.SIGN_UP_ROUTE}`;
    const mailOptions: Mail.Options = {
      ...MAIL_OPTIONS,
      text: `Create account in this link ${link}`,
    };

    if (token) {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          accessToken: token,
          ...MY_USER_MAIL,
        },
      });
      console.log("transport", transport);

      const result = await transport.sendMail(mailOptions);
      console.log("result", result);

      res.send(result);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
};
