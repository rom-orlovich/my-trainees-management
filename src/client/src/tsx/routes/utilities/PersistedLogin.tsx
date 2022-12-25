import { useEffect } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner/LoadingSpinner";

import HomePage from "../../pages/HomePage/HomePage";

import { authApi } from "../../redux/api/authAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import { authRoutes } from "../mainRoutes";

export const pathIsAuthRoute = (path: string) => {
  const pathEndPointURL = path.slice(1);
  return authRoutes.map((el) => el.path).includes(pathEndPointURL);
};

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

  // In order to display the auth pages in the home page background instead the dashboard background.
  const contentDisplayOnAccessToken = pathIsAuthRoute(location.pathname) ? (
    <HomePage />
  ) : (
    <Outlet />
  );

  return authState.accessToken ? (
    contentDisplayOnAccessToken
  ) : (
    <LoadingSpinner
      onErrorFun={() => {
        // Check if the url is not one of the authRoutes paths
        if (!pathIsAuthRoute(pathname) && pathname !== "/") {
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
