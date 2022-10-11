import { RequestHandler } from "express";
import axios from "axios";
import { clientMailOAuth } from "../utilities/contstans";

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
    } else res.sendStatus(400);
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
};
