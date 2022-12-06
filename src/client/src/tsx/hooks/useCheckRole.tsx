import React from "react";
import { User } from "../redux/api/interfaceAPI";
import useGetUserLoginData from "./useGetUserLoginData";

function useCheckRole() {
  const userData = useGetUserLoginData().authState.user;
  const userRole = userData?.role;

  const isAdmin = userRole === "admin";
  const isTrainer = userRole === "trainer";
  const isTrainee = userRole === "trainee";
  if (isAdmin || isTrainer || isTrainee)
    return { isAdmin, isTrainee, isTrainer, userData: userData as User };
  return { isAdmin, isTrainee, isTrainer, userData: undefined };
}

export default useCheckRole;
