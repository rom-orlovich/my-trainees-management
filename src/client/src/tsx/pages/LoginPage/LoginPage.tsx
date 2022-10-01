import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Form from "../../components/baseComponents/RHF-Components/Form/Form";
import { addFunction } from "../../components/baseComponents/RHF-Components/FormsHook";
import { credSchema } from "../../components/baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../components/baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { authApi } from "../../redux/api/authAPI";
import {
  LoginApi,
  ResponseMutationAuthAPI,
} from "../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { setLogin, setLogout } from "../../redux/slices/authSlice";
import { APP_ROUTE } from "../../routes/routesConstants";

function LoginPage() {
  const [login] = authApi.useLoginMutation();
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const token = useAppSelector((state) => state.authSlice.accessToken);
  const onSubmit = (body: LoginApi) =>
    login(body)
      .unwrap()
      .then(({ message, ...rest }) => {
        // dispatch(setLogin({ accessToken: rest.accessToken, user: rest.user }));
        nav("/");
      });

  // useEffect(() => {
  //   console.log(token);
  //   if (token) {
  //     nav("/");
  //   }
  //   // return () => {
  //   //   refreshToken({});
  //   // };
  // }, []);
  return (
    <Form<LoginApi>
      onSubmit={onSubmit}
      heading={"Login"}
      authButtonsContainer={true}
      isLoginMode={true}
      formOptions={{ resolver: yupResolver(credSchema), mode: "all" }}
    >
      {({ register, formState }) => {
        const { errors } = formState;

        return (
          <>
            <InputLabel
              LabelProps={{ labelText: "Username" }}
              InputProps={{ ...register("username") }}
            >
              <InputErrorMessage nameInput="Username" error={errors.username} />
            </InputLabel>
            <InputLabel
              LabelProps={{ labelText: "Password" }}
              InputProps={{ ...register("password"), type: "password" }}
            >
              <InputErrorMessage nameInput="Password" error={errors.password} />
            </InputLabel>
          </>
        );
      }}
    </Form>
  );
}

export default LoginPage;
