import React, { useCallback, useEffect, useRef } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/baseComponents/LoadingSpinner";

import { authApi } from "../redux/api/authAPI";
import { useAppSelector } from "../redux/hooks";
import { getAuthState } from "../redux/slices/authSlice";
import { APP_ROUTE } from "./routesConstants";
export const SUBTRACT_EXPIRE_TIME = 1000 * 60 * 5;

function PersistedLogin() {
  const authState = useAppSelector(getAuthState);

  const { isLoading, isError, isFetching, data } = authApi.useRefreshTokenQuery(
    {
      pollingInterval: authState.expireAt - SUBTRACT_EXPIRE_TIME,
    }
  );
  console.log(authState.expireAt - SUBTRACT_EXPIRE_TIME);
  const nav = useNavigate();

  useEffect(() => {
    if (isError) nav(`/${APP_ROUTE.LOGIN_ROUTE}`);
    // refreshToken({});
  }, [isError, nav]);

  return !!authState.user ? (
    <Outlet />
  ) : (
    <LoadingSpinner stateData={{ isLoading, isError, isFetching, data }}>
      {(data) => <Outlet />}
    </LoadingSpinner>
  );
}

export default PersistedLogin;
