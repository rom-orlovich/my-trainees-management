/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { RootState } from "../store";
import { authApi } from "./authAPI";
import { API_ROUTES } from "./interfaceAPI";

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

    let result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const resultError = result.error as { originalStatus: number };
      if (resultError.originalStatus === 403) {
        api.dispatch(
          authApi.util.prefetch("refreshToken", undefined, { force: true })
        );
        // try to get a new token
        // const refreshResult = await baseQuery(
        //   `${API_ROUTES.API_AUTH_ROUTE}/${API_ROUTES.REFRESH_TOKEN_ROUTE}`,
        //   api,
        //   extraOptions
        // );
        // console.log(refreshResult.data);
        if (authApi.endpoints.refreshToken.matchFulfilled({})) {
          console.log(authApi.endpoints.refreshToken.matchFulfilled({}));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(
            authApi.util.prefetch("logout", undefined, { force: true })
          );
          // result = await baseQuery(
          //   `${API_ROUTES.API_AUTH_ROUTE}/${API_ROUTES.LOGOUT_ROUTE}`,
          //   api,
          //   extraOptions
          // );
        }
      }
    }
    return result;
  };
