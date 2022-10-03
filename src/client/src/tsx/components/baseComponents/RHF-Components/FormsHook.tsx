import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

import { AnyFun } from "../../../types";

export const updateFunction =
  <T extends Record<string, any>>({
    sideEffect,
    updateItem,
    id,
  }: {
    updateItem: MutationTrigger<any>;
    sideEffect?: AnyFun;
    id: number;
  }) =>
  async (body: T) => {
    try {
      const res = await updateItem({ payload: body, id }).unwrap();
      console.log(res);
      sideEffect && sideEffect();
      return Promise.resolve(res);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
export const addFunction = <T extends Record<string, any>>({
  sideEffect,
  addItem,
}: {
  sideEffect?: AnyFun;
  addItem: MutationTrigger<any>;
}) => {
  return async (body: T) => {
    try {
      const res = await addItem(body).unwrap();
      sideEffect && sideEffect();
      console.log(res);
      return Promise.resolve(res);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
};
