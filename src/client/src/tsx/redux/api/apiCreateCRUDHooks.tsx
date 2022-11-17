import { createApi } from "@reduxjs/toolkit/query/react";
import { GenericRecord } from "../../types";

import { providerTag, providerTags } from "../reduxHelpers";
import { RootState } from "../store";
import { baseQueryWithReauth } from "./apiReauthQuery";
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

    baseQuery: baseQueryWithReauth(baseUrl),
    endpoints: (builder) => ({
      getItems: builder.query<ResponseQueryAPI<T>, GenericRecord<any>>({
        extraOptions: {},
        query: (params: GenericRecord<any>) => ({
          url: "/",
          params,
        }),

        transformResponse: (response: ResponseQueryAPI<T>) =>
          transformDataArr ? transformDataArr(response) : response,
        providesTags: (result) =>
          providerTags(result?.data, singleEntityName, listId),

        keepUnusedDataFor: keepUnusedDataFor ?? 60,
      }),
      getItemByID: builder.query<T, GenericRecord<any> & { id: number }>({
        query: ({ id, ...params }) => ({
          url: `/${singleEntityName}/${id}`,
          params,
        }),
        transformResponse: (response: T) =>
          transformData ? transformData(response) : response,
        providesTags: (value) =>
          value ? [providerTag(value, singleEntityName)] : [singleEntityName],
      }),

      updateItem: builder.mutation<ResponseMutationAPI, PayloadAPI<T>>({
        query: ({ id, ...payload }: PayloadAPI<T>) => ({
          url: `/${singleEntityName}/${id}`,
          method: "put",
          body: payload.payload,
        }),

        invalidatesTags: (value, err, arg) => [
          { type: singleEntityName, id: arg.id },
        ],
      }),

      deleteItem: builder.mutation<ResponseMutationAPI, string>({
        query: (id) => ({
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
