import { yupResolver } from "@hookform/resolvers/yup";
import path from "path";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../../components/baseComponents/Card/Card";
import Form from "../../components/baseComponents/RHF-Components/Form/Form";
import { loginSchema } from "../../components/baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../components/baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { authApi } from "../../redux/api/authAPI";
import { LoginForm } from "../../redux/api/interfaceAPI";
import { disableGoPrevPage } from "../../redux/slices/apiSideEffectSlice";
import { APP_ROUTE } from "../../routes/routesConstants";
import { relativePath } from "../../utilities/helpersFun";
import style from "../HomeCardForm.module.scss";

function LoginPage() {
  const [login] = authApi.useLoginMutation();
  const dispatch = useDispatch();
  // const nav = useNavigate();

  const onSubmit = async (body: LoginForm) => {
    dispatch(disableGoPrevPage());
    await login(body).unwrap();
    // .then(({ ...rest }) => {
    //   // nav(`/${APP_ROUTE.HOME_PAGE}`);
    // });
  };

  return (
    <Card className={style.card_form}>
      <Form<LoginForm>
        onSubmit={onSubmit}
        heading={"Login"}
        formProps={{ className: style.login_form }}
        authButtonsContainer={true}
        isLoginMode={true}
        pathMove={relativePath(APP_ROUTE.HOME_PAGE)}
        formOptions={{
          resolver: yupResolver(loginSchema),
          // mode: "all",
          defaultValues: { username: "example123", password: "example123" },
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
      <div>
        <NavLink to={relativePath(APP_ROUTE.EMAIL_VERIFY_ROUTE)}>
          Forget password?
        </NavLink>
      </div>
    </Card>
  );
}

export default LoginPage;
