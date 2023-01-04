import { rest } from "msw";
import { API_ROUTES } from "../tsx/redux/api/apiRoutes";

export const handlers = [
  rest.get(
    // `*/api/auth/token/refresh`,
    `*${API_ROUTES.API_AUTH_ROUTE}${API_ROUTES.REFRESH_TOKEN_ROUTE}`,
    (req, res, ctx) => {
      const refreshToken = req.cookies.refresh_token;
      if (refreshToken) return res(ctx.status(201), ctx.json({ user: "2" }));

      return res(ctx.status(403), ctx.json({ user: "2" }));
    }
  ),
];
