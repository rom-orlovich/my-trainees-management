import React from "react";
import { PropsBasic } from "./baseComponentsTypes";

function Card(props: PropsBasic) {
  return (
    <div
      style={{
        borderRadius: "5px",
        boxShadow: " 2px 2px 4px 4px rgba(0, 0, 0, 0.07)",
      }}
    >
      {props.children}
    </div>
  );
}

export default Card;
