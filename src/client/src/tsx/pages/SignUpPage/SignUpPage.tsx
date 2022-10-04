import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/baseComponents/Card/Card";
import Form from "../../components/baseComponents/RHF-Components/Form/Form";
import { signUpSchema } from "../../components/baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../components/baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { authApi } from "../../redux/api/authAPI";
import { SignUpForm } from "../../redux/api/interfaceAPI";
import style from "../HomeCardForm.module.scss";
function SignUpPage() {
  const [signUp] = authApi.useSignUpMutation();
  const { pathname } = useLocation();
  const nav = useNavigate();

  const onSubmit = (body: SignUpForm) =>
    signUp({ credentials: body, endPoint: pathname })
      .unwrap()
      .then(({ message, ...rest }) => {
        nav("/login");
      });

  return (
    <Card className={style.card_form}>
      <Form<SignUpForm>
        onSubmit={onSubmit}
        heading={"Sign Up"}
        authButtonsContainer={true}
        isLoginMode={false}
        formOptions={{
          resolver: yupResolver(signUpSchema),
          mode: "all",
          defaultValues: { username: "", password: "", confirmPassword: "" },
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
    </Card>
  );
}

export default SignUpPage;
