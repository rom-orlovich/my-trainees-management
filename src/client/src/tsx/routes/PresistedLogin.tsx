import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/baseComponents/LoadingSpinner";
import { useCallBackFun, useEffectOnce } from "../hooks/utilitiesHooks";
import { authApi } from "../redux/api/authAPI";
import { useAppSelector } from "../redux/hooks";
import {
  changeIsTokenExpiredState,
  getAuthState,
} from "../redux/slices/authSlice";

function PersistedLogin() {
  const authState = useAppSelector(getAuthState);
  const dispatch = useDispatch();
  const [refreshToken, { isLoading, isError, isFetching, data }] =
    authApi.useLazyRefreshTokenQuery({
      pollingInterval: authState.expireAt || 1000 * 60 * 14,
    });

  const nav = useNavigate();

  // useEffect(() => {
  //   if (authState.isTokenExpired) {
  //     refreshToken({});
  //     dispatch(changeIsTokenExpiredState());
  //   }
  // }, [authState]);

  // useEffect(() => {
  //   if (!authState.accessToken) {
  //     refreshToken({});
  //   }
  //   if (isError) nav("/login");
  // }, [authState, refreshToken, isError, nav]);

  useEffect(() => {
    refreshToken({});
    console.log(isError);
    if (isError) nav("/login");
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
