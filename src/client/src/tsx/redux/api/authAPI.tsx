import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  API_ROUTES,
  ResponseMutationAuthAPI,
  SignUpForm,
} from "./interfaceAPI";

export const apiAuthBaseQuery = fetchBaseQuery({
  baseUrl: API_ROUTES.API_AUTH_ROUTE,
  credentials: "include",
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: apiAuthBaseQuery,
  tagTypes: [API_ROUTES.TRAINEES_ENTITY],
  endpoints: (builder) => ({
    signUp: builder.mutation<
      any,
      { credentials: SignUpForm; endPoint: string }
    >({
      query: ({
        credentials: { confirmPassword, ...credentials },
        endPoint,
      }) => ({
        url: `${API_ROUTES.SIGN_UP_ROUTE}/${endPoint}`,
        method: "POST",
        body: { ...credentials },
      }),
    }),

    emailVerify: builder.mutation({
      query: (email: string) => ({
        url: API_ROUTES.EMAIL_VERIFY_ROUTE,
        method: "POST",
        body: { email },
      }),
    }),
    changeCredentials: builder.mutation<
      any,
      {
        username?: string;
        password?: string;
        userID: string;
        verifyToken: string;
      }
    >({
      query: ({ verifyToken, userID, ...credentials }) => ({
        url: `/users/${userID}${API_ROUTES.CHANGE_USER_CRED_ROUTE}`,
        method: "PUT",
        body: { ...credentials },
        headers: { authorization: `Bearer ${verifyToken}` },
      }),
    }),
    login: builder.mutation<ResponseMutationAuthAPI, any>({
      query: (credentials) => ({
        url: API_ROUTES.LOGIN_ROUTE,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refreshToken: builder.query<ResponseMutationAuthAPI, any>({
      query: () => ({
        url: API_ROUTES.REFRESH_TOKEN_ROUTE,
        credentials: "include",
      }),
    }),
    logout: builder.query({
      query: () => ({ url: API_ROUTES.LOGOUT_ROUTE }),
    }),
  }),
});
