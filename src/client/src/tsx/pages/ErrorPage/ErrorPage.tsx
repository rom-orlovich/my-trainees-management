import React from "react";
import { NavLink } from "react-router-dom";
import BackgroundVideo from "../../components/baseComponents/BackgroundVideo/BackgroundVideo";
import useLoadVideo from "../../hooks/useLoadVideo";
import { genClassName } from "../../utilities/helpersFun";
import homePageStyle from "../HomePage/HomePage.module.scss";

function ErrorPage() {
  return (
    <div
      className={genClassName(homePageStyle.home_page_container, "error_page")}
    >
      <BackgroundVideo />
      <div className={homePageStyle.home_page_text}>
        <>
          <h1> Oops, Something Is Went Wrong!</h1>
          {<NavLink to={-1 as any}> Previous Page</NavLink>}
        </>
      </div>
    </div>
  );
}

export default ErrorPage;
