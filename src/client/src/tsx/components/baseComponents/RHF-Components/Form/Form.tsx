/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import {
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSaveFormState from "../../../../hooks/useSaveFormState";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  enableGoPrevPage,
  getApiSideEffect,
} from "../../../../redux/slices/apiSideEffectSlice";
import {
  getFormsState,
  saveFormState,
} from "../../../../redux/slices/formValuesStateSlice";
import {
  closeModel,
  getModelControllerState,
  preModel,
} from "../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { genClassName } from "../../../../utilities/helpersFun";

import { FormProps } from "../../baseComponentsTypes";
import style from "./Form.module.scss";

export type FormRHFProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  formOptions?: UseFormProps<TFormValues>;
  formProps?: FormProps;
  editMode?: boolean;
  heading?: string;
  nameForm?: string;
  buttonNext?: boolean;
  pathMove?: string;
  formWithOneButton?: boolean;
  saveState?: boolean;
  isLoginMode?: boolean;
  customButtonText?: string;
  modelMode?: boolean;
  className?: string;
};

export default function Form<TFormValues extends FieldValues>({
  editMode,
  formProps,
  onSubmit,
  children,
  formOptions,
  heading,
  nameForm,
  buttonNext,
  pathMove,
  formWithOneButton,
  customButtonText,
  isLoginMode,
  modelMode,
  className,
  saveState = true,
}: FormRHFProps<TFormValues>) {
  const nav = useNavigate();

  const location = useLocation();

  const { defaultValues } = useAppSelector(getFormsState);
  const dispatch = useAppDispatch();
  const {
    goPrePageBehaviorState: { goPrevPage },
  } = useAppSelector(getApiSideEffect);
  const { displayContent } = useAppSelector(getModelControllerState);

  const methods = useForm<TFormValues>({
    ...formOptions,
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      ...formOptions?.defaultValues,
      ...defaultValues[className || location.pathname],
    },
  });

  // Side effect if the form is not in edit mode.
  // saves the form state values after the user exit from the form component
  // and the component will unmount.
  // useEffect(
  //   () => () => {
  //     if (!modelMode)
  //       if (saveState)
  //         if (!editMode) {
  //           dispatch(
  //             saveFormState({
  //               url: location.pathname,
  //               values: methods.getValues(),
  //             })
  //           );
  //         }
  //   },
  //   [location.pathname, location, dispatch, methods, editMode]
  // );
  useSaveFormState({
    getValues: methods.getValues,
    className: "",
    condition: !modelMode && saveState && !editMode,
  });

  const handleSubmit = async (data: TFormValues) => {
    try {
      await onSubmit(data);

      methods.reset();
      if (saveState)
        if (!editMode)
          dispatch(
            saveFormState({
              url: location.pathname,
              values: methods.getValues(),
            })
          );
      if (modelMode) {
        dispatch(displayContent.length ? preModel() : closeModel());
      } else if (goPrevPage) {
        nav((pathMove || -1) as any);
      }
      dispatch(enableGoPrevPage());
    } catch (error) {
      const Error = error as {
        data: { errorField: Path<TFormValues>; message: string };
      };
      console.log(error);
      methods.setError("server" as any, { message: Error.data?.message });
    }
  };

  const editModeText = editMode ? "Edit" : "Add";
  const authModeText = isLoginMode ? "Login" : "Sign Up";

  const buttonContainer = formWithOneButton ? (
    <div className={style.buttons_container_one_button}>
      <button type="submit" disabled={!methods.formState.isValid}>
        {customButtonText || authModeText}
      </button>
    </div>
  ) : (
    <div className={style.buttons_container_two_buttons}>
      <Link
        onClick={
          modelMode
            ? (e) => {
                e.preventDefault();
                dispatch(preModel());
              }
            : undefined
        }
        to={-1 as any}
      >
        Back
      </Link>
      <button type="submit" disabled={!methods.formState.isValid}>
        {customButtonText || (buttonNext ? "Next" : editModeText)}
      </button>
    </div>
  );

  return (
    <div className={genClassName(style.form_container, className)}>
      <div className={style.heading}>
        <h2>
          {!heading ? `${editMode ? "Edit" : "Add"} ${nameForm}` : heading}
        </h2>
      </div>
      <form
        onFocus={() => {
          methods.clearErrors("server" as any);
        }}
        {...formProps}
        className={`${style.form} ${formProps?.className || ""}`}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        {children(methods)}
        {methods.formState.errors?.server?.message ? (
          <p className={style.form_error_message}>
            {methods.formState.errors?.server?.message as string}
          </p>
        ) : (
          <></>
        )}
        {buttonContainer}
      </form>
    </div>
  );
}
