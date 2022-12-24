import { FaUserCircle } from "react-icons/fa";
import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";
import style from "./Welcome.module.scss";

export default function Welcome() {
  return (
    <span className={style.welcome_li}>
      <FaUserCircle className={style.welcome_icon} />
      <span style={{ fontWeight: "400" }}>
        {` Welcome,`}
        <span className={style.welcome_username}>
          {` ${useGetUserLoginData().authState.user?.username}!`}
        </span>
      </span>
    </span>
  );
}
