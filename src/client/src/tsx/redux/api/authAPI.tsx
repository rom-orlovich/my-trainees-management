import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  API_ROUTES,
  ResponseMutationAuthAPI,
  SignUpForm,
} from "./interfaceAPI";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_ROUTES.API_AUTH_ROUTE,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ResponseMutationAuthAPI, any>({
      query: (credentials) => {
        return {
          url: API_ROUTES.LOGIN_ROUTE,
          method: "post",
          body: { ...credentials },
        };
      },
    }),
    signUp: builder.mutation<
      any,
      { credentials: SignUpForm; endPoint: string }
    >({
      query: ({
        credentials: { confirmPassword, ...credentials },
        endPoint,
      }) => {
        return {
          url: `${API_ROUTES.SIGN_UP_ROUTE}/${endPoint}`,
          method: "post",
          body: { ...credentials },
        };
      },
    }),
    logout: builder.query({
      query: () => ({ url: API_ROUTES.LOGOUT_ROUTE }),
    }),
    refreshToken: builder.query<ResponseMutationAuthAPI, any>({
      query: () => ({
        url: API_ROUTES.REFRESH_TOKEN_ROUTE,
        credentials: "include",
      }),
    }),
  }),
});
