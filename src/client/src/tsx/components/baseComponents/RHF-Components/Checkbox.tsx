import React from "react";

interface CheckboxLabelProps {
  InputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { isError?: boolean };
  LabelProps: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > & { labelText: string };
  children?: React.ReactNode;
}

function Checkbox({
  InputProps,
  children,
  LabelProps: { htmlFor, labelText, ...LabelProps },
}: CheckboxLabelProps) {
  return (
    <span className="checkbox_label">
      <label htmlFor={htmlFor} {...LabelProps}>
        {labelText}
      </label>
      <input type="checkbox" {...InputProps} />
      {children}
    </span>
  );
}

export default Checkbox;
