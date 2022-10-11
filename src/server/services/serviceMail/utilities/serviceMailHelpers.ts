export const generateConfig = (url: string, accessToken: string) => ({
  method: "get",
  url,
  headers: {
    Authorization: `Bearer ${accessToken} `,
    "Content-type": "application/json",
  },
});
