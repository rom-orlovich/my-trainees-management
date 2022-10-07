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

  const { isLoading, isError, isFetching, data, refetch } =
    authApi.useRefreshTokenQuery({}, { pollingInterval: SUBTRACT_EXPIRE_TIME });

  const nav = useNavigate();

  useEffect(() => {
    if (isError) nav(`/${APP_ROUTE.LOGIN_ROUTE}`);
    if (!authState.accessToken) refetch();

    console.log(authState.accessToken);
  }, [isError, nav, authState]);

  return authState.accessToken ? (
    <Outlet />
  ) : (
    <LoadingSpinner stateData={{ isLoading, isError, isFetching, data }}>
      {(data) => <Outlet />}
    </LoadingSpinner>
  );
}

export default PersistedLogin;
