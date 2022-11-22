import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";
import useGetUserLoginData from "../../../../hooks/useGetUserLoginData";

import { genClassName } from "../../../../utilities/helpersFun";
import style from "../../UserDetailsStyle/UserDetails.module.scss";

function TrainerUserDetails({ className }: PropsBasic) {
  const { authState } = useGetUserLoginData();

  return (
    <Card className={genClassName(className, style.user_details_container)}>
      <div>
        <FaUserCircle className={style.profile_icon} />
      </div>

      <h2>{authState.user?.username || "Not Active yet"}</h2>
      <div className={style.user_details_links}>
        <Link to={``}>Edit Details</Link>
      </div>
    </Card>
  );
}

export default TrainerUserDetails;
