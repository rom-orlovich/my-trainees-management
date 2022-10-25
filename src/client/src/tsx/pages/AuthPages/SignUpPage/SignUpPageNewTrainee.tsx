/* eslint-disable @typescript-eslint/no-shadow */
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import { traineesApi } from "../../../redux/api/hooksAPI";
import SignUpPage from "./SignUpPage";

function SignUpPageNewTrainee() {
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const { isError, isFetching, isLoading, data } =
    traineesApi.useGetRegisterTraineeQuery({
      id: id || "",
      verifyToken: searchParams.get("verify") || "",
    });

  return (
    <LoadingSpinner
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
