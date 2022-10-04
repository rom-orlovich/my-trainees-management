import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { providerTag, providerTags } from "../reduxHelpers";
import { RootState } from "../store";
import {
  PayloadAPI,
  ResponseMutationAPI,
  ResponseQueryAPI,
} from "./interfaceAPI";

interface OptionsAPI<T, K> {
  reducerPath: string;
  baseUrl: string;
  singleEntityName: string;
  listId: string;
  keepUnusedDataFor?: number;
  transformDataArr?: (args: ResponseQueryAPI<T>) => any;
  transformData?: (args: T | K) => any;
}

/**
 *
 * @param OptionsApi
 * @param  OptionsApi.reducerPath -The path name to reducer.
 * @param  OptionsApi.baseUrl - The base url of the endpoint.
 * @param  OptionsApi.singleEntityName- The name of one item from the the db.
 * @param  OptionsApi.transformDataArr- Function that will make some transform to the items data arr.
 * @param OptionsApi.transformDataArr- Function that will make some transform to one item.
 * @returns Api object with CRUD hooks for the given endpoint.
 */
export function apiCreateCRUDHooks<T extends object, K extends object = any>({
  reducerPath,
  baseUrl,
  singleEntityName,
  listId,
  keepUnusedDataFor,
  transformDataArr,
  transformData,
}: OptionsAPI<T, K>) {
  return createApi({
    tagTypes: [singleEntityName],
    reducerPath,
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, api) => {
        const state = api.getState() as RootState;
        // const token = state.authSlice.accessToken;
        // if (token) {
        //   headers.set("authorization", `Bearer ${token}`);
        // }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getItems: builder.query<ResponseQueryAPI<T>, Record<string, any>>({
        query: (params: Record<string, any>) => ({
          url: "/",
          params,
        }),

        transformResponse: (response: ResponseQueryAPI<T>) => {
          return transformDataArr ? transformDataArr(response) : response;
        },
        providesTags: (result) => {
          return providerTags(result?.data, singleEntityName, listId);
        },

        keepUnusedDataFor: keepUnusedDataFor ?? 60,
      }),
      getItemByID: builder.query<T, number>({
        query: (id: number) => `/${singleEntityName}/${id}`,
        transformResponse: (response: T) => {
          return transformData ? transformData(response) : response;
        },
        providesTags: (value) => {
          return value
            ? [providerTag(value, singleEntityName)]
            : [singleEntityName];
        },
      }),

      updateItem: builder.mutation<ResponseMutationAPI, PayloadAPI<T>>({
        query: ({ id, ...payload }: PayloadAPI<T>) => ({
          url: `/${singleEntityName}/${id}`,
          method: "put",
          body: payload.payload,
        }),

        invalidatesTags: (value, err, arg) => {
          return [{ type: singleEntityName, id: arg.id }];
        },
      }),

      deleteItem: builder.mutation<ResponseMutationAPI, string>({
        query: (id: string) => ({
          url: `/${singleEntityName}/${id}`,
          method: "delete",
        }),
        invalidatesTags: [{ id: listId, type: singleEntityName }],
      }),

      createOneItem: builder.mutation<ResponseMutationAPI, T>({
        query: (payload: T) => ({
          url: `/${singleEntityName}`,
          method: "POST",
          body: payload,
        }),

        invalidatesTags: [{ id: listId, type: singleEntityName }],
      }),
    }),
  });
}
