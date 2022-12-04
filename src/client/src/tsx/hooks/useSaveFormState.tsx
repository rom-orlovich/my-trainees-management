import React, { useEffect } from "react";
import { FieldValues, UseFormGetValues, UseFormReturn } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  getFormsState,
  saveFormState,
} from "../redux/slices/formValuesStateSlice";

function useSaveFormState<T extends FieldValues>({
  getValues,
  className,
  condition = true,
}: {
  getValues: UseFormGetValues<T>;
  className?: string;
  condition?: boolean;
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { defaultValues } = useAppSelector(getFormsState);
  // Side effect if the form is not in edit mode.
  // saves the form state values after the user exit from the form component
  // and the component will unmount.
  useEffect(
    () => () => {
      if (condition) {
        console.log(getValues());
        dispatch(
          saveFormState({
            url: className || location.pathname,
            values: getValues(),
          })
        );
      }
    },
    [location.pathname, location, dispatch]
  );

  return defaultValues[className || location.pathname] as T;
}

export default useSaveFormState;
