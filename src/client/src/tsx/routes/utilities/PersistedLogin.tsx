import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner/LoadingSpinner";

import { authApi } from "../../redux/api/authAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import { APP_ROUTE } from "../appRoutesConstants";

export const SUBTRACT_EXPIRE_TIME = 1000 * 60 * 10;

function PersistedLogin() {
  const authState = useAppSelector(getAuthState);

  const [trigger, { isLoading, isError, isFetching, data }] =
    authApi.useLazyRefreshTokenQuery({});

  const nav = useNavigate();

  useEffect(() => {
    if (!authState.accessToken) trigger({});
  }, [authState.accessToken, trigger]);
  // authState.accessToken
  return authState.accessToken ? (
    <Outlet />
  ) : (
    <LoadingSpinner
      isErrorFun={() => {
        nav(`/${APP_ROUTE.LOGIN_ROUTE}`);
      }}
      stateData={{ isLoading, isError, isFetching, data }}
    >
      {() => <Outlet />}
    </LoadingSpinner>
  );
}

export default PersistedLogin;
