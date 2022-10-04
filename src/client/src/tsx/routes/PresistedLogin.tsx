import React, { useCallback, useEffect, useRef } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/baseComponents/LoadingSpinner";

import { authApi } from "../redux/api/authAPI";
import { useAppSelector } from "../redux/hooks";
import { getAuthState } from "../redux/slices/authSlice";
export const SUBTRACT_EXPIRE_TIME = 1000 * 60 * 10;

function PersistedLogin() {
  const authState = useAppSelector(getAuthState);

  const [refreshToken, { isLoading, isError, isFetching, data }] =
    authApi.useLazyRefreshTokenQuery({
      pollingInterval: authState.expireAt - SUBTRACT_EXPIRE_TIME,
    });

  const nav = useNavigate();

  useEffect(() => {
    if (isError) nav("/login");
    refreshToken({});
  }, [isError, refreshToken, nav]);

  return !!authState.user ? (
    <Outlet />
  ) : (
    <LoadingSpinner stateData={{ isLoading, isError, isFetching, data }}>
      {(data) => <Outlet />}
    </LoadingSpinner>
  );
}

export default PersistedLogin;
