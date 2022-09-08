import React from "react";
import { PropsBasic } from "../../components/baseComponents/baseComponentsTypes";

function Main({ className, children }: PropsBasic) {
  return <main className={className}>{children}</main>;
}

export default Main;
