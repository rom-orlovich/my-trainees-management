/* eslint-disable @typescript-eslint/no-shadow */
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { traineesApi } from "../../../redux/api/hooksAPI";

import { APP_ROUTE } from "../../../routes2/appRoutesConstants";
import SignUpPage from "./SignUpPage";

function SignUpPageNewTrainee() {
  const { id } = useParams();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const { isError, isFetching, isLoading, data } =
    traineesApi.useGetRegisterTraineeQuery({
      id: id || "",
      verifyToken: searchParams.get("verify") || "",
    });

  return (
    <LoadingSpinner
      onErrorFun={() => nav(`/${APP_ROUTE.LOGIN_ROUTE}`)}
      nameData="Trainee"
      stateData={{ isError, isFetching, isLoading, data }}
    >
      {(data) => (
        <SignUpPage
          defaultValues={{ email: data.email, id: Number(data.profile_id) }}
        />
      )}
    </LoadingSpinner>
  );
}

export default SignUpPageNewTrainee;
