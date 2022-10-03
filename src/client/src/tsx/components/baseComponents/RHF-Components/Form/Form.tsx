import { SyntheticEvent, useEffect, useRef, useState } from "react";
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
  resetGoPrevPageState,
} from "../../../../redux/slices/apiSideEffectSlice";
import {
  getFormsState,
  saveErrorForm,
  saveFormState,
} from "../../../../redux/slices/formValuesStateSlice";
import { genClassName } from "../../../../utilities/helpersFun";

import { FormProps } from "../../baseComponentsTypes";
import style from "./Form.module.scss";

type FormRHFProps<TFormValues extends FieldValues> = {
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
  const [disabled, setDisabled] = useState(true);

  const nav = useNavigate();

  const location = useLocation();

  const { defaultValues, errors } = useAppSelector(getFormsState);

  const {
    goPrePageBehaviorState: { goPrevPage },
  } = useAppSelector(getApiSideEffect);
  const dispatch = useAppDispatch();

  const methods = useForm<TFormValues>({
    ...formOptions,
    defaultValues: {
      ...formOptions?.defaultValues,
      ...defaultValues[location.pathname],
    },
  });
  // Side effect that enable the goPrePage state only for form components.
  useEffect(() => {
    dispatch(enableGoPrevPage());
  }, [dispatch]);

  // Side effect of return the to the previous page after the api response a response with id.
  useEffect(() => {
    if (goPrevPage) {
      dispatch(resetGoPrevPageState());
      nav((pathMove || -1) as any);
    }
  }, [dispatch, pathMove, goPrevPage, nav]);

  // Side effect of reset the form  after submit was successfully
  // and if the form is not in edit mode so save the empty state values of the form .
  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      console.log("yes");
      methods.reset();
      if (!editMode)
        dispatch(
          saveFormState({ url: location.pathname, values: methods.getValues() })
        );
    }
  }, [
    nav,
    editMode,
    methods.formState.isSubmitSuccessful,
    methods,
    dispatch,
    location.pathname,
  ]);

  // Side effect if the form is not in edit mode.
  // saves the form state values after the user exit from the form component
  // and the component wll unmount.
  useEffect(() => {
    return () => {
      if (!editMode) {
        dispatch(
          saveFormState({ url: location.pathname, values: methods.getValues() })
        );
      }
    };
  }, [location.pathname, location, dispatch, methods, editMode]);

  // Side effect of disabling the submit button if the form is not valid.
  useEffect(() => {
    if (methods.formState.isValid) {
      setDisabled(false);
    }
  }, [methods.formState.isValid]);

  // Reset the error from the server.
  useEffect(() => {
    if (methods.formState.isDirty)
      if (errors[location.pathname])
        dispatch(saveErrorForm({ url: location.pathname, error: "" }));
  }, [errors[location.pathname], methods.formState.isDirty]);

  const handleSubmit = async (data: TFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      const Error = error as {
        data: { errorField: Path<TFormValues>; message: string };
      };
      dispatch(
        saveErrorForm({ url: location.pathname, error: Error.data.message })
      );
    }
  };

  const editModeText = editMode ? "Edit" : "Add";
  const authModeText = isLoginMode ? "Login" : "Sign Up";
  return (
    <div className={style.form_container}>
      <div className={style.heading}>
        <h2>
          {!heading ? `${editMode ? "Edit" : "Add"} ${nameForm}` : heading}
        </h2>
      </div>
      <form
        {...formProps}
        className={`${style.form} ${formProps?.className || ""}`}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        {children(methods)}
        {errors[location.pathname] ? (
          <p className={genClassName(style.form_error_message)}>
            {errors[location.pathname]}
          </p>
        ) : (
          <></>
        )}
        {changeButtonContainer ? (
          <div className={style.buttons_container_save_button}>
            <button type="submit" disabled={disabled}>
              Save Changes
            </button>
          </div>
        ) : authButtonsContainer ? (
          <div className={style.buttons_container_save_button}>
            <button type="submit" disabled={disabled}>
              {authModeText}
            </button>
          </div>
        ) : (
          <div className={style.buttons_container_edit_back}>
            <Link to={-1 as any}>Back</Link>
            <button type="submit" disabled={disabled}>
              {buttonNext ? "Next" : editModeText}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
