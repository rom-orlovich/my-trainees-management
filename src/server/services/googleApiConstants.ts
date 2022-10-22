import { google } from "googleapis";
import Mail from "nodemailer/lib/mailer";
import { AuthenticationTypeOAuth2 } from "nodemailer/lib/smtp-connection";

export const OAuth2 = {
  clientId: process.env.GMAIL_API_CLIENT_ID,
  clientSecret: process.env.GMAIL_API_CLIENT_SECRET,
  refreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
  redirectUrl: process.env.GMAIL_API_REDIRECT_URI,
};

export const MY_USER_MAIL: AuthenticationTypeOAuth2 = {
  type: "OAuth2",
  user: "mytraineesmanagement@gmail.com",
  clientId: OAuth2.clientId,
  clientSecret: OAuth2.clientSecret,
  refreshToken: OAuth2.refreshToken,
};

export const MAIL_OPTIONS: Mail.Options = {
  from: "mytraineesmanagement@gmail.com>",
};

export const clientMailOAuth = new google.auth.OAuth2(
  OAuth2.clientId,
  OAuth2.clientSecret,
  OAuth2.redirectUrl
);

clientMailOAuth.setCredentials({ refresh_token: OAuth2.refreshToken });

// clientMailOAuth.on("tokens", (tokens) => {
//   if (tokens.refresh_token) {
//     // store the refresh_token in my database!
//     console.log(tokens.refresh_token);
//     clientMailOAuth.setCredentials({ refresh_token: tokens.refresh_token });
//   }
//   console.log(tokens.access_token);
// });
