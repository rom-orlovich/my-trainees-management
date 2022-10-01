import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authApi } from "../redux/api/authAPI";
import { useAppSelector } from "../redux/hooks";

function PublicRoute() {
  const token = useAppSelector((state) => state.authSlice.accessToken);
  const [refreshToken, state] = authApi.useLazyRefreshTokenQuery();
  // const location = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (!token) {
      refreshToken({}).then(() => nav("/"));
    } else {
      nav("/");
    }
  }, []);
  return <Outlet />;
}

export default PublicRoute;
