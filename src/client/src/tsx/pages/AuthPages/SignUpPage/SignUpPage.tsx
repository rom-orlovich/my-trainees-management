import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

import { NavLink } from "react-router-dom";
import Card from "../../../components/baseComponents/Card/Card";
import Form from "../../../components/baseComponents/RHF-Components/Form/Form";
import { signUpSchema } from "../../../components/baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../../components/baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { authApi } from "../../../redux/api/authAPI";
import { SignUpForm } from "../../../redux/api/interfaceAPI";

import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { relativePath } from "../../../utilities/helpersFun";
import style from "../../HomeCardForm.module.scss";

function SignUpPage({
  defaultValues,
}: {
  defaultValues?: { email: string; id: number };
}) {
  const [signUp] = authApi.useSignUpMutation();
  const onSubmit = async (body: SignUpForm) =>
    signUp({
      credentials: body,
      endPoint: defaultValues ? `trainee/${defaultValues.id}` : "trainer",
    }).unwrap();

  return (
    <Card className={style.card_form}>
      <Form<SignUpForm>
        onSubmit={onSubmit}
        heading={"Sign Up"}
        formWithOneButton={true}
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
                LabelProps={{ labelText: "Username" }}
                InputProps={{ ...register("username") }}
              >
                <InputErrorMessage
                  nameInput="Username"
                  error={errors.username}
                />
              </InputLabel>{" "}
              <InputLabel
                LabelProps={{ labelText: "Email" }}
                InputProps={{ ...register("email") }}
              >
                <InputErrorMessage nameInput="Email" error={errors.email} />
              </InputLabel>
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
      <div className={style.card_form_footer}>
        <NavLink to={relativePath(APP_ROUTE.LOGIN_ROUTE)}>
          <p> Do you have an account?</p>
          <p>It's time to login! </p>
        </NavLink>
      </div>
    </Card>
  );
}

export default SignUpPage;
