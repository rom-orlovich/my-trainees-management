/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { setLoginUserData, setLogout } from "../slices/authSlice";
import { RootState } from "../store";
import { API_ROUTES } from "./apiRoutes";
import { apiAuthBaseQuery } from "./authAPI";
import { ResponseMutationAuthAPI } from "./interfaceAPI";

// Append userID or trainerUserID to the params of the query if they contains "put" or "delete" or "post" method.
function appendQueryStringParam(
  args: string | FetchArgs,
  value: string
): string | FetchArgs {
  if (typeof args !== "string") {
    // Only for DELETE/POST/PUT methods
    if (args.method)
      if (args.params && "trainerUserID" in args.params) {
        args = { params: { trainerUserID: value, ...args?.params }, ...args };
      } else args.params = { userID: value, ...args?.params };
  }

  return args;
}

export const baseQueryWithReauth =
  (
    baseUrl: string
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl,

      prepareHeaders: (headers, api) => {
        const state = api.getState() as RootState;
        const token = state.authSlice.accessToken;

        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
      },
    });

    const state = api.getState() as RootState;
    const value = state.authSlice.user?.user_id;

    args = appendQueryStringParam(args, String(value || 0));

    let result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const resultError = result.error as { originalStatus: number };
      if (resultError.originalStatus === 403) {
        // try to get a new token
        const refreshResult = await apiAuthBaseQuery(
          `${API_ROUTES.REFRESH_TOKEN_ROUTE}`,
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const Res = refreshResult.data as ResponseMutationAuthAPI;
          api.dispatch(setLoginUserData(Res));

          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          result = await apiAuthBaseQuery(
            `${API_ROUTES.LOGOUT_ROUTE}`,
            api,
            extraOptions
          );
          api.dispatch(setLogout());
        }
      }
    }
    return result;
  };
