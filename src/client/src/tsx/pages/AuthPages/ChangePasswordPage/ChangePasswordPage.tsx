import { yupResolver } from "@hookform/resolvers/yup";

import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams, useSearchParams } from "react-router-dom";

import Card from "../../../components/baseComponents/Card/Card";
import Form from "../../../components/baseComponents/RHF-Components/Form/Form";
import { resetPasswordSchema } from "../../../components/baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../../components/baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../../components/baseComponents/RHF-Components/InputLabel/InputLabel";
import { authApi } from "../../../redux/api/authAPI";
import { ChangePasswordForm } from "../../../redux/api/interfaceAPI";
import { disableGoPrevPage } from "../../../redux/slices/apiSideEffectSlice";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { relativePath } from "../../../utilities/helpersFun";
import style from "../../HomeCardForm.module.scss";

function ChangePasswordPage() {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const [changeCredentials] = authApi.useChangeCredentialsMutation();
  const dispatch = useDispatch();

  const onSubmit = async ({ password }: ChangePasswordForm) => {
    dispatch(disableGoPrevPage());
    await changeCredentials({
      password,
      userID: id || "",
      verifyToken: searchParams.get("verify") || "",
    }).unwrap();
  };

  return (
    <Card className={style.card_form}>
      <Form<ChangePasswordForm>
        onSubmit={onSubmit}
        heading={"Reset Password"}
        formProps={{ className: style.login_form }}
        formWithOneButton={true}
        pathMove={relativePath(APP_ROUTE.HOME_PAGE)}
        formOptions={{
          resolver: yupResolver(resetPasswordSchema),

          defaultValues: {
            password: "",
            confirmPassword: "",
          },
        }}
      >
        {({ register, formState }) => {
          const { errors } = formState;
          console.log(errors);
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
      <NavLink to={relativePath(APP_ROUTE.LOGIN_ROUTE)}>Back to login</NavLink>
    </Card>
  );
}

export default ChangePasswordPage;
