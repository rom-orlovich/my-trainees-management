import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { AnyFun } from "../../../types";

export const updateFunction = <T extends Record<string, any>>({
  sideEffect,
  updateItem,
  id,
}: {
  updateItem: MutationTrigger<any>;
  sideEffect?: AnyFun;
  id: number;
}) => {
  const handleSubmit = async (body: T) => {
    try {
      const res = await updateItem({ payload: body, id });
      console.log(res);
      sideEffect && sideEffect();
      return Promise.resolve(res);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  return handleSubmit;
};
export const addFunction = <T extends Record<string, any>>({
  sideEffect,
  addItem,
}: {
  sideEffect?: AnyFun;
  addItem: MutationTrigger<any>;
}) => {
  const handleSubmit = async (body: T) => {
    try {
      const res = await addItem(body);
      sideEffect && sideEffect();

      console.log(res);
      return Promise.resolve(res);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  return handleSubmit;
};
