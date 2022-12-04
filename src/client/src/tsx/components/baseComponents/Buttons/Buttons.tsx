import React from "react";
import { genClassName } from "../../../utilities/helpersFun";
import { PropsBasic } from "../baseComponentsTypes";

import style from "./Button.module.scss";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
function Button({
  children,
  className,
  ...buttonProps
}: ButtonProps & PropsBasic) {
  return (
    <button
      {...buttonProps}
      className={genClassName(style.button_container, className)}
    >
      {children}
    </button>
  );
}

export default Button;
