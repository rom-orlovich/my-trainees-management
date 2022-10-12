import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

import { NavLink } from "react-router-dom";
import Card from "../../components/baseComponents/Card/Card";
import Form from "../../components/baseComponents/RHF-Components/Form/Form";
import { signUpSchema } from "../../components/baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../components/baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { authApi } from "../../redux/api/authAPI";
import { SignUpForm } from "../../redux/api/interfaceAPI";

import { APP_ROUTE } from "../../routes/routesConstants";
import { relativePath } from "../../utilities/helpersFun";
import style from "../HomeCardForm.module.scss";

function ForgetPasswordPage({
  defaultValues,
}: {
  defaultValues?: { email: string; id: number };
}) {
  const [signUp] = authApi.useSignUpMutation();
  const onSubmit = async (body: SignUpForm) => {};
  // signUp({
  //   credentials: body,
  //   endPoint: defaultValues ? `trainee/${defaultValues.id}` : "trainer",
  // }).unwrap();

  return (
    <Card className={style.card_form}>
      <Form<SignUpForm>
        onSubmit={onSubmit}
        heading={"Enter Email"}
        authButtonsContainer={true}
        isLoginMode={false}
        pathMove={relativePath(APP_ROUTE.LOGIN_ROUTE)}
        formOptions={{
          resolver: yupResolver(signUpSchema),
          defaultValues: {
            email: defaultValues ? defaultValues.email : "",
            username: "",
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
                LabelProps={{ labelText: "Email" }}
                InputProps={{ ...register("email") }}
              >
                <InputErrorMessage nameInput="Email" error={errors.email} />
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
