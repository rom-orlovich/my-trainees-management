import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import InputErrorMessage from "../InputErrorMessage";
import AutocompleteInput, { AutocompleteInputProps } from "./AutocompleteInput";

export interface ControlComponentRHF<F extends FieldValues> {
  name: FieldPath<F>;
  control: Control<F>;
}

export type AutocompleteInputRHFprops<
  F extends FieldValues,
  ObjType extends Record<string, any>
> = {
  AutocompleteInputProps: AutocompleteInputProps<ObjType, F>;
} & ControlComponentRHF<F>;

function AutocompleteInputRHF<
  F extends FieldValues,
  ObjType extends Record<string, any>
>({
  name,
  control,
  AutocompleteInputProps: {
    InputLabelProps: { LabelProps, InputProps, ...InputLabelProps },
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ...AutocompleteInputProps
  },
}: AutocompleteInputRHFprops<F, ObjType>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, onBlur, name, ...field },
        fieldState: { error },
      }) => (
        <AutocompleteInput
          {...AutocompleteInputProps}
          InputLabelProps={{
            ...InputLabelProps,
            LabelProps: { ...LabelProps, htmlFor: name },
            InputProps: { ...InputProps, ref, onBlur },
          }}
          RHFProps={{ ...field }}
        >
          {/* <InputErrorMessage nameInput={name} error={error} /> */}
        </AutocompleteInput>
      )}
    />
  );
}

export default AutocompleteInputRHF;
