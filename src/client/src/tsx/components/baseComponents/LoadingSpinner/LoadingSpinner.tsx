import React, { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnyFun } from "../../../types";
import { genClassName, getValuesArrObj } from "../../../utilities/helpersFun";
import style from "./LoadingSpinner.module.scss";

export interface LoadingSpinnerProps<T> {
  stateData: {
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    data: T | undefined;
    error?: Error;
  };
  onErrorFun?: AnyFun;
  path?: string;
  message?: ReactNode;
  showNoDataMessage?: boolean;
  nameData?: string;
  className?: string;
  children?: ReactNode | ((data: T) => ReactNode);
  errorElement?: JSX.Element;
}
// Loading Spinner that take care the logic of async functions loading,fetching and ect.
// Return children as function with the exist data or as regular children type or
// in case of error the function return not found data.
function LoadingSpinner<T extends object>({
  stateData: { isLoading, isFetching, data, isError, error },
  onErrorFun,
  message,
  path,
  nameData = "The Data",
  showNoDataMessage,
  className,
  children,
  errorElement,
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
    onErrorFun && isError && onErrorFun();
  }, [isError, onErrorFun]);

  useEffect(() => {
    isExistDataEmpty() &&
      path &&
      nav(path as any, { replace: true, state: { from: location } });
  }, [data]);

  if (isLoading || isFetching)
    return <p className={style.loading_spinner}> Loading...</p>;

  const SpinnerMessage = (
    <p
      className={genClassName(
        `message_spinner`,
        style.loading_spinner,
        className
      )}
    >
      {message || `${nameData} is not found`}
    </p>
  );

  if (!data || error) {
    return showNoDataMessage ? SpinnerMessage : errorElement || <></>;
  }

  if (isExistDataEmpty()) {
    return SpinnerMessage;
  }

  return <> {typeof children === "function" ? children(data) : children}</>;
}

export default LoadingSpinner;
