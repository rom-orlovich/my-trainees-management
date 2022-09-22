import React from "react";
import { genClassName } from "../../../utilities/helpersFun";
import { PropsBasic } from "../baseComponentsTypes";
import style from "./Card.module.scss";
function Card(props: PropsBasic) {
  return (
    <div className={genClassName(style.card_container, props.className || "")}>
      {props.children}
    </div>
  );
}

export default Card;
