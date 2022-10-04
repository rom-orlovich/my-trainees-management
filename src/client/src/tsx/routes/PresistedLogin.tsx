import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/baseComponents/LoadingSpinner";
import { useCallBackFun, useEffectOnce } from "../hooks/utilitiesHooks";
import { authApi } from "../redux/api/authAPI";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { activeRefreshToken, getAuthState } from "../redux/slices/authSlice";
export const SUBTRACT_EXPIRE_TIME =
  1000 * 60 * Number(process.env.SUBTRACT_EXPIRE_TIME || 5);
function PersistedLogin() {
  const authState = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();
  const [refreshToken, { isLoading, isError, isFetching, data }] =
    authApi.useLazyRefreshTokenQuery({
      pollingInterval:
        authState.expireAt - SUBTRACT_EXPIRE_TIME || 1000 * 60 * 14,
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
