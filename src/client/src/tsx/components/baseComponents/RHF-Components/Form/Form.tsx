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
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  enableGoPrevPage,
  getApiSideEffect,
} from "../../../../redux/slices/apiSideEffectSlice";
import {
  getFormsState,
  saveFormState,
} from "../../../../redux/slices/formValuesStateSlice";
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
  changeButtonContainer?: boolean;
  authButtonsContainer?: boolean;
  isLoginMode?: boolean;
};

export default function Form<TFormValues extends Record<string, any>>({
  editMode,
  formProps,
  onSubmit,
  children,
  formOptions,
  heading,
  nameForm,
  buttonNext,
  pathMove,
  changeButtonContainer,
  authButtonsContainer,
  isLoginMode,
}: FormRHFProps<TFormValues>) {
  // const [disabled, setDisabled] = useState(true);

  const nav = useNavigate();

  const location = useLocation();

  const { defaultValues } = useAppSelector(getFormsState);

  const {
    goPrePageBehaviorState: { goPrevPage },
  } = useAppSelector(getApiSideEffect);
  const dispatch = useAppDispatch();

  const methods = useForm<TFormValues>({
    ...formOptions,
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      ...formOptions?.defaultValues,
      ...defaultValues[location.pathname],
    },
  });

  // Side effect if the form is not in edit mode.
  // saves the form state values after the user exit from the form component
  // and the component wll unmount.
  useEffect(
    () => () => {
      if (!editMode) {
        dispatch(
          saveFormState({
            url: location.pathname,
            values: methods.getValues(),
          })
        );
      }
    },
    [location.pathname, location, dispatch, methods, editMode]
  );

  const handleSubmit = async (data: TFormValues) => {
    try {
      await onSubmit(data);
      methods.reset();
      if (!editMode)
        dispatch(
          saveFormState({
            url: location.pathname,
            values: methods.getValues(),
          })
        );

      if (goPrevPage) {
        nav((pathMove || -1) as any);
      }
      dispatch(enableGoPrevPage());
    } catch (error) {
      const Error = error as {
        data: { errorField: Path<TFormValues>; message: string };
      };
      console.log(Error);
      methods.setError("server" as any, { message: Error.data?.message });
    }
  };

  const editModeText = editMode ? "Edit" : "Add";
  const authModeText = isLoginMode ? "Login" : "Sign Up";

  const buttonContainer = changeButtonContainer ? (
    <div className={style.buttons_container_save_button}>
      <button type="submit" disabled={!methods.formState.isValid}>
        Save Changes
      </button>
    </div>
  ) : authButtonsContainer ? (
    <div className={style.buttons_container_save_button}>
      <button type="submit" disabled={!methods.formState.isValid}>
        {authModeText}
      </button>
    </div>
  ) : (
    <div className={style.buttons_container_edit_back}>
      <Link to={-1 as any}>Back</Link>
      <button type="submit" disabled={!methods.formState.isValid}>
        {buttonNext ? "Next" : editModeText}
      </button>
    </div>
  );

  return (
    <div className={style.form_container}>
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
