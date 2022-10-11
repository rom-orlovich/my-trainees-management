import { google } from "googleapis";

export const OAuth2 = {
  clientId: process.env.GMAIL_API_CLIENT_ID,
  clientSecret: process.env.GMAIL_API_CLIENT_SECRET,
  refreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
  redirectUrl: process.env.GMAIL_API_REDIRECT_URI,
};

export const USER_MAIL = {
  type: "OAuth2",
  user: "mytraineesmanagement@gmail.com",
  clientId: OAuth2.clientId,
  clientSecret: OAuth2.clientSecret,
  refreshToken: OAuth2.refreshToken,
};

export const MAIL_OPTIONS = {
  from: "mytraineesmanagement@gmail.com>",
  to: "madman280797@gmail.com",
  subject: "Gmail API NodeJS",
};

export const clientMailOAuth = new google.auth.OAuth2(
  OAuth2.clientId,
  OAuth2.clientSecret,
  OAuth2.redirectUrl
);
clientMailOAuth.setCredentials({ refresh_token: OAuth2.refreshToken });
