/* eslint-disable no-nested-ternary */
import React from "react";
import { genClassName } from "../../../../utilities/helpersFun";
import { IconOption } from "../AutocompleteInput/AutocompleteInput";
import InputIcon, { InputIconProps } from "../InputIcon/InputIcon";
import style from "./InputLabel.module.scss";

export interface InputLabelProps {
  TextAreaProps?: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  // & { isError?: boolean };
  InputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  // &
  // { isError?: boolean };
  LabelProps: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > & { labelText: string };
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
    <span
      className={genClassName(
        TextAreaProps ? `textarea_label` : `input_label`,
        style.wrapper,
        className
      )}
    >
      <label {...LabelProps} htmlFor={htmlFor}>
        {labelText}
      </label>
      {TextAreaProps ? (
        <textarea
          ref={TextAreaProps.ref}
          id={htmlFor}
          name={htmlFor}
          {...TextAreaProps}
        />
      ) : InputProps ? (
        <input
          ref={InputProps?.ref}
          id={htmlFor}
          name={htmlFor}
          {...InputProps}
        />
      ) : (
        <></>
      )}
      {inputIconProps && <InputIcon {...inputIconProps} />}
      {children}
    </span>
  );
}
