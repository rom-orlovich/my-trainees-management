import { useCallback, useEffect, useRef } from "react";
import { AnyFun } from "../types";

export const useCallBackFun = (cb: AnyFun) => {
  const newCB = useCallback((...arg: any[]) => cb(arg), [cb]);
  return newCB;
};

export const useEffectOnce = (cbMount: AnyFun, cbUnmount?: AnyFun) => {
  const isActivated = useRef(true);

  useEffect(() => {
    if (isActivated.current) {
      isActivated.current = false;
      cbMount();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    () => {
      if (cbUnmount) return cbUnmount();
    };
  }, [cbMount, cbUnmount]);
};
