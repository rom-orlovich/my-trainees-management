import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import InputErrorMessage from "../InputErrorMessage";
import AutocompleteInput, { AutocompleteInputProps } from "./AutocompleteInput";

interface AutocompleteInputRHFprops<
  F extends FieldValues,
  ObjType extends Record<string, any>
> {
  name: FieldPath<F>;
  control: Control<F>;
  AutocompleteInputProps: AutocompleteInputProps<ObjType, F>;
}
function AutocompleteInputRHF<
  F extends FieldValues,
  ObjType extends Record<string, any>
>({
  name,
  control,
  AutocompleteInputProps: {
    InputLabelProps: { LabelProps, InputProps, ...InputLabelProps },
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
      }) => {
        return (
          <AutocompleteInput
            {...AutocompleteInputProps}
            InputLabelProps={{
              ...InputLabelProps,

              LabelProps: { ...LabelProps, htmlFor: name },
              InputProps: { ...InputProps, ref, onBlur },
            }}
            RHFProps={{ ...field }}
          >
            <InputErrorMessage nameInput={name} error={error} />
          </AutocompleteInput>
        );
      }}
    />
  );
}

export default AutocompleteInputRHF;
