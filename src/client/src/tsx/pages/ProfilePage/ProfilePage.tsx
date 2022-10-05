import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";

function ProfilePage() {
  const authState = useAppSelector(getAuthState);
  return (
    <section>
      <h1> {authState.user?.username}</h1>
    </section>
  );
}

export default ProfilePage;
