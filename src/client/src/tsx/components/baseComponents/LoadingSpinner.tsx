import React, { ReactNode } from "react";
import { getValuesArrObj } from "../../utlities/helpersFun";
import style from "./LoadingSpinner.module.scss";
export interface LoadingSpinnerProps<T> {
  stateData: {
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    data: T | undefined;
  };
  messege?: string;
  nameData?: string;
  children?: ReactNode | ((data: T) => ReactNode);
}
// Loading Spinner that take care the logic of async functions loading,fetching and ect.
// Return children as function with the exist data or as regular children type or
// in case of error the function return not found data.
function LoadingSpinner<T extends object>({
  stateData: { isLoading, isFetching, data },
  messege,
  nameData = "The Data",

  children,
}: LoadingSpinnerProps<T>) {
  if (isLoading || isFetching)
    return <p className="loading_spinner"> Loading...</p>;

  const spinner_message = (
    <p className={`message_spinner`}>
      {messege ? messege : `${nameData} is not found`}
    </p>
  );

  if (!data) return spinner_message;

  if (data) {
    const values = getValuesArrObj(data);

    if (Array.isArray(values[0]) && values[0].length === 0)
      return spinner_message;
  }

  return <> {typeof children === "function" ? children(data) : children}</>;
}

export default LoadingSpinner;
