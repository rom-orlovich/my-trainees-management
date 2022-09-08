import React from "react";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
import InputErrorMessage from "../InputErrorMessage";
import AutocompleteInput, { AutocompleteInputProps } from "./AutocompleteInput";

interface AutocompleteInputRHFprops<F, O> {
  name: FieldPath<F>;
  control: Control<F>;
  AutocompleteInputProps: AutocompleteInputProps<O, F>;
}
function AutocompleteInputRHF<F, O>({
  name,
  control,
  AutocompleteInputProps: {
    InputLabelProps: { LabelProps, InputProps, ...InputLabelProps },
    ...AutocompleteInputProps
  },
}: AutocompleteInputRHFprops<F, O>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, onBlur, name, ...field },
        fieldState: { error },
        formState,
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
