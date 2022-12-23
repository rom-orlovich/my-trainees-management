import React from "react";
import { NavLink } from "react-router-dom";
import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import style from "./HomePage.module.scss";
import BackgroundVideo from "../../components/baseComponents/BackgroundVideo/BackgroundVideo";
import useLoadVideo from "../../hooks/useLoadVideo";

function HomePage() {
  return (
    <section className={style.home_page_container}>
      <BackgroundVideo />

      <InsteadOutletRoutes InsteadOutletRoutesPaths={""}>
        <div className={style.home_page_text}>
          <>
            <h1> Your Business Is Our Pleasure</h1>
            {<NavLink to={`/${APP_ROUTE.LOGIN_ROUTE}`}> Get Started</NavLink>}
          </>
        </div>
      </InsteadOutletRoutes>
    </section>
  );
}

export default HomePage;
