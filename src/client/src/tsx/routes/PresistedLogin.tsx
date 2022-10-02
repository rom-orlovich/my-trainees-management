import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/baseComponents/LoadingSpinner";
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
    authApi.useLazyRefreshTokenQuery();

  const nav = useNavigate();

  useEffect(() => {
    if (authState.isTokenExpired) {
      refreshToken({});
      dispatch(changeIsTokenExpiredState());
    }
  }, [authState]);

  useEffect(() => {
    if (!authState.accessToken) {
      refreshToken({});
    }
    if (isError) nav("/login");
  }, [authState, refreshToken, isError, nav]);

  return authState.accessToken ? (
    <Outlet />
  ) : (
    <LoadingSpinner stateData={{ isLoading, isError, isFetching, data }}>
      {(data) => <Outlet />}
    </LoadingSpinner>
  );
}

export default PersistedLogin;
