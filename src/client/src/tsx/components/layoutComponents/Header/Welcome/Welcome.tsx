import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";

export default function Welcome() {
  return (
    <>
      <span style={{ fontWeight: "400" }}> Welcome, </span>
      <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
        {`${useGetUserLoginData().authState.user?.username}!`}
      </span>
    </>
  );
}
