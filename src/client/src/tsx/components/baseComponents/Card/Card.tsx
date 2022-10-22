import React from "react";
import { genClassName } from "../../../utilities/helpersFun";
import { DivProps, PropsBasic } from "../baseComponentsTypes";
import style from "./Card.module.scss";

function Card(props: PropsBasic & { divProps?: DivProps }) {
  return (
    <div
      tabIndex={-1}
      {...props.divProps}
      className={genClassName(style.card_container, props.className)}
    >
      {props.children}
    </div>
  );
}

export default Card;
