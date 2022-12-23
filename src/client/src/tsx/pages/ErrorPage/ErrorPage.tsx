import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundVideo from "../../components/baseComponents/BackgroundVideo/BackgroundVideo";
import { genClassName } from "../../utilities/helpersFun";
import homePageStyle from "../HomePage/HomePage.module.scss";

function ErrorPage() {
  const [loadingState, setLoadingState] = useState(true);
  return (
    <div
      className={genClassName(homePageStyle.home_page_container, "error_page")}
    >
      <BackgroundVideo
        onLoadedData={() => {
          setLoadingState(false);
        }}
      />
      <div className={homePageStyle.home_page_text}>
        <>
          <h1> Oops, Something Is Went Wrong!</h1>
          {!loadingState && <Link to={-1 as any}> Previous Page</Link>}
        </>
      </div>
    </div>
  );
}

export default ErrorPage;
