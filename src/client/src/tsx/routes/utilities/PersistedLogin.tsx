import { useEffect } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import HomePage from "../../pages/HomePage/HomePage";

import { authApi } from "../../redux/api/authAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import { APP_ROUTE } from "../../routes2/appRoutesConstants";

export const SUBTRACT_EXPIRE_TIME = 1000 * 60 * 10;

function PersistedLogin() {
  const authState = useAppSelector(getAuthState);

  const [trigger, { isLoading, isError, isFetching, data }] =
    authApi.useLazyRefreshTokenQuery({});

  const nav = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!authState.accessToken) trigger({});
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
