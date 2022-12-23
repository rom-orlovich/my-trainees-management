import { useEffect } from "react";

import { Outlet } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner/LoadingSpinner";

import HomePage from "../../pages/HomePage/HomePage";

import { authApi } from "../../redux/api/authAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";

function PersistedLogin() {
  const authState = useAppSelector(getAuthState);

  const [trigger, { isLoading, isError, isFetching, data }] =
    authApi.useLazyRefreshTokenQuery({});

  useEffect(() => {
    if (!authState.accessToken) {
      trigger({});
    }
  }, [authState.accessToken, trigger]);

  return authState.accessToken ? (
    <Outlet />
  ) : (
    <LoadingSpinner
      errorElement={<HomePage />}
      stateData={{ isLoading, isError, isFetching, data }}
    >
      {() => <Outlet />}
    </LoadingSpinner>
  );
}

export default PersistedLogin;
