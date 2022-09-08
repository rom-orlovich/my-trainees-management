import React from "react";
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
}

export function InputLabel({
  TextAreaProps,
  LabelProps: { labelText, htmlFor, ...LabelProps },
  InputProps,
  children,
}: InputLabelProps) {
  return (
    <span
      className={
        TextAreaProps ? `textarea_label` : `input_label ${style.wrapper}`
      }
    >
      <label {...LabelProps} htmlFor={htmlFor}>
        {labelText}
      </label>
      {TextAreaProps ? (
        <textarea ref={TextAreaProps.ref} {...TextAreaProps} id={htmlFor} />
      ) : InputProps ? (
        <input ref={InputProps?.ref} {...InputProps} id={htmlFor} />
      ) : (
        <></>
      )}
      {children}
    </span>
  );
}
