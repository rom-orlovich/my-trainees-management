import React from "react";
import useGetUserLoginData from "./useGetUserLoginData";

function useCheckRole() {
  const userRole = useGetUserLoginData().authState.user?.role;
  const isAdmin = userRole === "admin";
  const isTrainer = userRole === "trainer";
  const isTrainee = userRole === "trainee";
  return { isAdmin, isTrainee, isTrainer };
}

export default useCheckRole;
