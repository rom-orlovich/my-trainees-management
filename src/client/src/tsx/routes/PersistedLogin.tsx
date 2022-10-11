import React, { useCallback, useEffect, useRef } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/baseComponents/LoadingSpinner";

import { authApi } from "../redux/api/authAPI";
import { useAppSelector } from "../redux/hooks";
import { getAuthState } from "../redux/slices/authSlice";
import { APP_ROUTE } from "./routesConstants";
export const SUBTRACT_EXPIRE_TIME = 1000 * 60 * 10;

function PersistedLogin() {
  const authState = useAppSelector(getAuthState);

  const [trigger, { isLoading, isError, isFetching, data }] =
    authApi.useLazyRefreshTokenQuery({});

  const nav = useNavigate();

  useEffect(() => {
    if (!authState.accessToken ) trigger({});
    console.log("authState.accessToken", authState.accessToken);
  }, [authState.accessToken, trigger]);

  return authState.accessToken ? (
    <Outlet />
  ) : (
    <LoadingSpinner
      isErrorFun={() => {

        nav(`/${APP_ROUTE.LOGIN_ROUTE}`);
      }}
      stateData={{ isLoading, isError, isFetching, data }}
    >
      {(data) => <Outlet />}
    </LoadingSpinner>
  );
}

export default PersistedLogin;
