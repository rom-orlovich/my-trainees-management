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
import { apiAuthBaseQuery, authApi } from "./authAPI";
import { API_ROUTES, ResponseMutationAuthAPI } from "./interfaceAPI";

function appendQueryStringParam(
  args: string | FetchArgs,
  key: string,
  value: string
): string | FetchArgs {
  let urlEnd = typeof args === "string" ? args : args.url;

  if (urlEnd.indexOf("?") < 0) urlEnd += "?";
  else urlEnd += "&";
  if (urlEnd.indexOf("userID") < 0) urlEnd += `${key}=${value}`;

  return typeof args === "string" ? urlEnd : { ...args, url: urlEnd.slice(1) };
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
    console.log(appendQueryStringParam(args, "userID", String(value || 0)));
    // eslint-disable-next-line no-param-reassign
    args = appendQueryStringParam(args, "userID", String(value || 0));

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
