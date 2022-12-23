import { useEffect } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import Dashboard from "../../Dashboard";
import useCheckRole from "../../hooks/useCheckRole";
import HomePage from "../../pages/HomePage/HomePage";

import { authApi } from "../../redux/api/authAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";

function PersistedLogin() {
  const authState = useAppSelector(getAuthState);

  const [trigger, { isLoading, isError, isFetching, data, error }] =
    authApi.useLazyRefreshTokenQuery({});

  const nav = useNavigate();

  useEffect(() => {
    if (!authState.accessToken) {
      trigger({});
    }
  }, [authState.accessToken, trigger]);

  console.log(authState.accessToken);

  return authState.accessToken ? (
    <Outlet />
  ) : (
    <LoadingSpinner
      errorElement={<HomePage />}
      stateData={{ isLoading, isError, isFetching, data }}
    >
      {() => {
        console.log("here");
        return <Outlet />;
      }}
    </LoadingSpinner>
  );
}

export default PersistedLogin;
