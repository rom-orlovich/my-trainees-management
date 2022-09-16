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
  let messages: Partial<
    Record<LiteralUnion<keyof RegisterOptions, string>, string>
  > = {
    required: "Require Field",
    typeError: "Enter valid input.",
    email: "Email must be vaiid email.",
    default: "Enter valid input.",
  };

  return (
    <>
      {error?.message && (
        <p className="error_message" style={{ color: "red" }}>
          {messages[error.type || "default"]}
        </p>
      )}
    </>
  );
}

export default InputErrorMessage;
