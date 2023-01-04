import { rest } from "msw";
import { API_ROUTES } from "../tsx/redux/api/apiRoutes";

export const handlers = [
  rest.get(
    `*${API_ROUTES.API_AUTH_ROUTE}${API_ROUTES.REFRESH_TOKEN_ROUTE}`,
    (req, res, ctx) => {
      const refreshToken = req.cookies.refresh_token;
      if (refreshToken) return res(ctx.status(201), ctx.json({ user: "2" }));

      return res(ctx.status(403), ctx.json({ user: "2" }));
    }
  ),
  rest.post(
    `*${API_ROUTES.API_AUTH_ROUTE}${API_ROUTES.LOGIN_ROUTE}`,
    (req, res, ctx) => res(ctx.status(201), ctx.json({ user: "2" }))

    // return res(ctx.status(401), ctx.json({ user: "2" }));
  ),
];
