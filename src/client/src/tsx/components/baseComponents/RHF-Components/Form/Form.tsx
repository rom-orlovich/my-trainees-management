import { useEffect, useState } from "react";
import {
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  enableGoPrevPage,
  resetGoPrevPageState,
} from "../../../../redux/slices/apiSideEffectSlice";
import { saveFormState } from "../../../../redux/slices/formValuesStateSlice";

import { FormProps } from "../../baseComponentsTypes";
import style from "./Form.module.scss";

type FormRHFProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  formOptions?: UseFormProps<TFormValues>;
  formProps?: FormProps;
  editMode?: boolean;
  heading?: string;
  nameForm?: string;
  buttonNext?: boolean;
  pathMove?: string;
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
}: FormRHFProps<TFormValues>) {
  const nav = useNavigate();

  const location = useLocation();
  const defaultValue = useAppSelector(
    (state) => state.formValuesState.defaultValues
  );
  const goPrevPage = useAppSelector(
    (state) => state.apiSideEffect.goPrePageBehaviorState.goPrevPage
  );
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(true);

  const methods = useForm<TFormValues>({
    ...formOptions,
    defaultValues: {
      ...formOptions?.defaultValues,
      ...defaultValue[location.pathname],
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
      console.log(pathMove || -1);
      nav((pathMove || -1) as any);
    }
  }, [dispatch, pathMove, goPrevPage, nav]);

  // Side effect of reset the form  after submit was successfull
  // and if the form is not in edit mode so save the empty state values of the form .
  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
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
    if (methods.formState.isValid) setDisabled(false);
  }, [methods.formState.isValid]);

  const handleSubmit = (data: TFormValues) => {
    onSubmit(data);
  };
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
        <div className={style.buttons_container}>
          <Link to={-1 as any}>Back</Link>
          <button type="submit" disabled={disabled}>
            {!buttonNext ? (editMode ? "Edit" : "Add") : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
