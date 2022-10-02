import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { saveFormResponse } from "../../../redux/slices/formValuesStateSlice";
import { AnyFun } from "../../../types";

export const useUpdateFunction = <T extends Record<string, any>>() => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
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
        const res = await updateItem({ payload: body, id });
        console.log(res);
        sideEffect && sideEffect();
        dispatch(saveFormResponse({ url: pathname, response: res }));
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
