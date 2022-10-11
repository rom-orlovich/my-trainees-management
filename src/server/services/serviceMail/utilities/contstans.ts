export const AUTH = {
  type: "OAuth2",
  user: "mytraineesmanagement@gmail.com",
  clientId: process.env.GMAIL_API_CLIENT_ID,
  clientSecret: process.env.GMAIL_API_CLIENT_SECRET,
  refreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
};

export const MAIL_OPTIONS = {
  from: "Siddhant &lt;sid.cd.varma@gmail.com>",
  to: "sid.cd.varma@gmail.com",
  subject: "Gmail API NodeJS",
};
