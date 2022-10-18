import React, { ReactNode, useEffect } from "react";
import { AnyFun } from "../../types";
import { getValuesArrObj } from "../../utilities/helpersFun";
import style from "./LoadingSpinner.module.scss";

export interface LoadingSpinnerProps<T> {
  stateData: {
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    data: T | undefined;
  };
  isErrorFun?: AnyFun;
  message?: string;
  nameData?: string;
  children?: ReactNode | ((data: T) => ReactNode);
}
// Loading Spinner that take care the logic of async functions loading,fetching and ect.
// Return children as function with the exist data or as regular children type or
// in case of error the function return not found data.
function LoadingSpinner<T extends object>({
  stateData: { isLoading, isFetching, data, isError },
  isErrorFun,
  message,
  nameData = "The Data",
  children,
}: LoadingSpinnerProps<T>) {
  useEffect(() => {
    isErrorFun && isError && isErrorFun();
  }, [isError, isErrorFun]);

  if (isLoading || isFetching)
    return <p className="loading_spinner"> Loading...</p>;

  const SpinnerMessage = (
    <p className={`message_spinner`}>
      {message || `${nameData} are not found`}
    </p>
  );

  if (!data) return <></>;

  if (data) {
    const values = getValuesArrObj(data);

    if (Array.isArray(values[0]) && values[0].length === 0)
      return SpinnerMessage;
  }

  return <> {typeof children === "function" ? children(data) : children}</>;
}

export default LoadingSpinner;
