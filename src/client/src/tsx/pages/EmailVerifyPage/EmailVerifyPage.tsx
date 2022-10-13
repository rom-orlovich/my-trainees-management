import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

import { NavLink } from "react-router-dom";
import Card from "../../components/baseComponents/Card/Card";
import Form from "../../components/baseComponents/RHF-Components/Form/Form";
import {
  emailVerifySchema,
  signUpSchema,
} from "../../components/baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../components/baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { authApi } from "../../redux/api/authAPI";
import { EmailVerifyForm, SignUpForm } from "../../redux/api/interfaceAPI";

import { APP_ROUTE } from "../../routes/routesConstants";
import { relativePath } from "../../utilities/helpersFun";
import style from "../HomeCardForm.module.scss";

function ForgetPasswordPage() {
  const [emailVerify] = authApi.useEmailVerifyMutation();
  const onSubmit = async ({ email }: EmailVerifyForm) =>
    emailVerify(email).unwrap();

  return (
    <Card className={style.card_form}>
      <Form<EmailVerifyForm>
        onSubmit={onSubmit}
        heading={"Enter Email"}
        authButtonsContainer={true}
        isLoginMode={false}
        pathMove={relativePath(APP_ROUTE.LOGIN_ROUTE)}
        formOptions={{
          resolver: yupResolver(emailVerifySchema),
          defaultValues: {
            email: "",
            confirmEmail: "",
          },
        }}
      >
        {({ register, formState }) => {
          const { errors } = formState;

          return (
            <>
              <InputLabel
                LabelProps={{ labelText: "Email" }}
                InputProps={{ ...register("email") }}
              >
                <InputErrorMessage nameInput="Email" error={errors.email} />
              </InputLabel>
              <InputLabel
                LabelProps={{ labelText: "Confirm Email" }}
                InputProps={{ ...register("confirmEmail") }}
              >
                <InputErrorMessage
                  nameInput="Confirm Email"
                  error={errors.confirmEmail}
                />
              </InputLabel>
            </>
          );
        }}
      </Form>
      <div className={style.card_form_footer}>
        <NavLink to={relativePath(APP_ROUTE.LOGIN_ROUTE)}>
          Back to login
        </NavLink>
      </div>
    </Card>
  );
}

export default ForgetPasswordPage;
