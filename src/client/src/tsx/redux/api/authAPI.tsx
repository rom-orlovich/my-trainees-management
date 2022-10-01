import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_ROUTES, ResponseMutationAuthAPI } from "./interfaceAPI";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_ROUTES.API_AUTH_ROUTE }),
  endpoints: (builder) => ({
    login: builder.mutation<ResponseMutationAuthAPI, any>({
      query: (credentials) => {
        return {
          url: "/login",
          method: "post",
          //   credentials: "include",
          body: { ...credentials },
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
