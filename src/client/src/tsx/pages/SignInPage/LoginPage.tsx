import { yupResolver } from "@hookform/resolvers/yup";
import path from "path";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../../components/baseComponents/Card/Card";
import Form from "../../components/baseComponents/RHF-Components/Form/Form";
import { loginSchema } from "../../components/baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../components/baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { authApi } from "../../redux/api/authAPI";
import { LoginForm } from "../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../routes/routesConstants";
import { relativePath } from "../../utilities/helpersFun";
import style from "../HomeCardForm.module.scss";
function LoginPage() {
  const [login] = authApi.useLoginMutation();
  const nav = useNavigate();
  const onSubmit = (body: LoginForm) =>
    login(body)
      .unwrap()
      .then(({ ...rest }) => {
        nav(`/${APP_ROUTE.HOME_PAGE}`);
      })
      .catch(console.log);

  return (
    <Card className={style.card_form}>
      <Form<LoginForm>
        onSubmit={onSubmit}
        heading={"Login"}
        authButtonsContainer={true}
        isLoginMode={true}
        formOptions={{
          resolver: yupResolver(loginSchema),
          mode: "all",
          defaultValues: { username: "", password: "" },
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
            </>
          );
        }}
      </Form>
      <div>
        <NavLink to={relativePath(APP_ROUTE.SIGN_UP)}>
          Don't have an account? Try it Free!
        </NavLink>
      </div>
    </Card>
  );
}

export default LoginPage;
