/* eslint-disable no-nested-ternary */
import React from "react";
import { genClassName } from "../../../../utilities/helpersFun";
import { IconOption } from "../AutocompleteInput/AutocompleteInput";
import InputIcon, { InputIconProps } from "../InputIcon/InputIcon";
import style from "./InputLabel.module.scss";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & { labelText: string };
export interface InputLabelProps {
  TextAreaProps?: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  // & { isError?: boolean };
  InputProps?: InputProps;
  // &
  // { isError?: boolean };
  LabelProps: LabelProps;
  children?: React.ReactNode;

  inputIconProps?: InputIconProps;
}

export function InputLabel({
  className,
  TextAreaProps,
  LabelProps: { labelText, htmlFor, ...LabelProps },
  InputProps,
  children,
  inputIconProps,
}: InputLabelProps & { className?: string }) {
  return (
    // <span>
    <label
      {...LabelProps}
      className={genClassName(
        TextAreaProps ? `textarea_label` : `input_label`,
        LabelProps.className,
        style.wrapper,
        className
      )}
    >
      {labelText}

      {TextAreaProps ? (
        <textarea {...TextAreaProps} ref={TextAreaProps.ref} />
      ) : InputProps ? (
        <input {...InputProps} ref={InputProps?.ref} />
      ) : (
        <></>
      )}
      {inputIconProps && <InputIcon {...inputIconProps} />}
      {children}
    </label>

    // </span>
  );
}
