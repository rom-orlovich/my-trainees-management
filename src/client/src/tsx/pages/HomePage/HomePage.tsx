import React from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import InsteadOutletRoutes from "../../routes/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import style from "./HomePage.module.scss";

function HomePage() {
  const { pathname } = useLocation();
  return (
    <section className={style.homePage_container}>
      <InsteadOutletRoutes InsteadOutletRoutesPaths={""}>
        <NavLink to={APP_ROUTE.LOGIN_ROUTE}> Get Start</NavLink>
      </InsteadOutletRoutes>
    </section>
  );
}

export default HomePage;
