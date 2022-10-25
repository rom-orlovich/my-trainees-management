import React, { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnyFun } from "../../../types";
import { getValuesArrObj } from "../../../utilities/helpersFun";
import style from "./LoadingSpinner.module.scss";

export interface LoadingSpinnerProps<T> {
  stateData: {
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    data: T | undefined;
  };
  isErrorFun?: AnyFun;
  path?: string;
  message?: ReactNode;
  showNoDataMessage?: boolean;
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
  path,
  nameData = "The Data",
  showNoDataMessage,
  children,
}: LoadingSpinnerProps<T>) {
  const nav = useNavigate();
  const location = useLocation();
  const isExistDataEmpty = () => {
    if (data) {
      const values = getValuesArrObj(data);
      return Array.isArray(values[0]) && values[0].length === 0;
    }
    return false;
  };

  useEffect(() => {
    isErrorFun && isError && isErrorFun();
  }, [isError, isErrorFun]);

  useEffect(() => {
    isExistDataEmpty() &&
      path &&
      nav(path as any, { replace: true, state: { from: location } });
  }, [data]);

  if (isLoading || isFetching)
    return <p className={style.loading_spinner}> Loading...</p>;

  const SpinnerMessage = (
    <p className={`message_spinner`}>
      {message || `${nameData} are not found`}
    </p>
  );

  if (!data) {
    return showNoDataMessage ? SpinnerMessage : <></>;
  }

  if (isExistDataEmpty()) {
    return SpinnerMessage;
  }

  return <> {typeof children === "function" ? children(data) : children}</>;
}

export default LoadingSpinner;