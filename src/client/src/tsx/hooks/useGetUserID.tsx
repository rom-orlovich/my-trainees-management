import React from "react";
import { useAppSelector } from "../redux/hooks";
import { getAuthState } from "../redux/slices/authSlice";

function useGetUserID() {
  const authState = useAppSelector(getAuthState);
  const user_id = authState.user?.user_id;
  return { user_id, authState };
}

export default useGetUserID;
