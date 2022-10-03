import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { BaseQueryError } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { AnyFun } from "../../../types";

export const useUpdateFunction = <T extends Record<string, any>>() => {
  const handleSubmit =
    ({
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
