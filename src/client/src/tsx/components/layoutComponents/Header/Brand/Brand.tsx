import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../../assets/logo.png";
import style from "./Brand.module.scss";

function Brand() {
  return (
    <div>
      <Link to="/">
        <img src={logo} className={style.img_brand} alt="Not found" />
      </Link>
    </div>
  );
}

export default Brand;
