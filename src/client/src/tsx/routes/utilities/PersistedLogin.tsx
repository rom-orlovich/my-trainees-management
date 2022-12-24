import { useEffect } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner/LoadingSpinner";

import HomePage from "../../pages/HomePage/HomePage";

import { authApi } from "../../redux/api/authAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import { authRoutes } from "../mainRoutes";

function PersistedLogin() {
  const authState = useAppSelector(getAuthState);
  const nav = useNavigate();

  const { pathname } = useLocation();
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
      onErrorFun={() => {
        const path = pathname.slice(1);
        // Check if the url is not one of the authRoutes paths
        if (
          !authRoutes.map((el) => el.path).includes(path) &&
          pathname !== "/"
        ) {
          nav("/");
        }
      }}
      errorElement={<HomePage />}
      stateData={{ isLoading, isError, isFetching, data }}
    >
      {() => <Outlet />}
    </LoadingSpinner>
  );
}

export default PersistedLogin;
