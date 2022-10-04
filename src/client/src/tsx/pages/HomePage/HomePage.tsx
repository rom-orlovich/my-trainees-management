import React from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import style from "./HomePage.module.scss";
function HomePage() {
  const { pathname } = useLocation();
  return (
    <section className={style.homePage_container}>
      <MainRoute mainRoutes={""}>
        <NavLink to={APP_ROUTE.LOGIN_ROUTE}> Get Start</NavLink>
      </MainRoute>
    </section>
  );
}

export default HomePage;
