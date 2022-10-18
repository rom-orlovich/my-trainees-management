import React from "react";
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  LiteralUnion,
  Merge,
  RegisterOptions,
} from "react-hook-form";

interface InputErrorMessageProps {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<DeepRequired<Date>>>;
  nameInput?: string;
}
function InputErrorMessage({ error, nameInput }: InputErrorMessageProps) {
  const messages: Partial<
    Record<LiteralUnion<keyof RegisterOptions, string>, string>
  > = {
    required: "Require Field",
    typeError: "Enter valid input.",
    email: "Email must be valid email.",
    default: error?.message,
  };

  return (
    <>
      {error?.message && (
        <p className="error_message" style={{ color: "red" }}>
          {/* {messages[error.type || "default"]}
           */}
          {error.message}
        </p>
      )}
    </>
  );
}

export default InputErrorMessage;
