import { yupResolver } from "@hookform/resolvers/yup";
import path from "path";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Card from "../../components/baseComponents/Card/Card";
import Form from "../../components/baseComponents/RHF-Components/Form/Form";
import { loginSchema } from "../../components/baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../components/baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { authApi } from "../../redux/api/authAPI";
import { ChangePasswordForm, LoginForm } from "../../redux/api/interfaceAPI";
import { disableGoPrevPage } from "../../redux/slices/apiSideEffectSlice";
import { APP_ROUTE } from "../../routes/routesConstants";
import { relativePath } from "../../utilities/helpersFun";
import style from "../HomeCardForm.module.scss";

function ChangePasswordPage() {
  const [login] = authApi.useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async ({ password }: ChangePasswordForm) => {
    dispatch(disableGoPrevPage());
    await login(password).unwrap();
  };

  return (
    <Card className={style.card_form}>
      <Form<ChangePasswordForm>
        onSubmit={onSubmit}
        heading={"Login"}
        formProps={{ className: style.login_form }}
        authButtonsContainer={true}
        isLoginMode={true}
        pathMove={relativePath(APP_ROUTE.HOME_PAGE)}
        formOptions={{
          resolver: yupResolver(loginSchema),
          // mode: "all",
          defaultValues: {
            password: "",
            confirmPassword: "",
          },
        }}
      >
        {({ register, formState }) => {
          const { errors } = formState;

          return (
            <>
              <InputLabel
                LabelProps={{ labelText: "Password" }}
                InputProps={{ ...register("password"), type: "password" }}
              >
                <InputErrorMessage
                  nameInput="Password"
                  error={errors.password}
                />
              </InputLabel>
              <InputLabel
                LabelProps={{ labelText: "Confirm Password" }}
                InputProps={{
                  ...register("confirmPassword"),
                  type: "password",
                }}
              >
                <InputErrorMessage
                  nameInput="Confirm Password"
                  error={errors.confirmPassword}
                />
              </InputLabel>
            </>
          );
        }}
      </Form>
    </Card>
  );
}

export default ChangePasswordPage;
