import React from "react";
import { useSearchParams } from "react-router-dom";

function useGetQueryParams(str: string) {
  const [queryParams] = useSearchParams();
  return queryParams.get(str);
}

export default useGetQueryParams;
