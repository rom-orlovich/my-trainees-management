import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/baseComponents/LoadingSpinner";
import { authApi } from "../redux/api/authAPI";
import { useAppSelector } from "../redux/hooks";

function PersistedLogin() {
  const token = useAppSelector((state) => state.authSlice.accessToken);
  const [refreshToken, { isLoading, isError, isFetching, data, status }] =
    authApi.useLazyRefreshTokenQuery();

  const nav = useNavigate();

  useEffect(() => {
    if (!token) {
      refreshToken({});
    }
    if (isError) nav("/login");
    // console.log(status);
  }, [token, refreshToken, isError, nav]);

  return token ? (
    <Outlet />
  ) : (
    <LoadingSpinner stateData={{ isLoading, isError, isFetching, data }}>
      {(data) => <Outlet />}
    </LoadingSpinner>
  );
}

export default PersistedLogin;
