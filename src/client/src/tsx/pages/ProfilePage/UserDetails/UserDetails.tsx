import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { PropsBasic } from "../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../components/baseComponents/Card/Card";
import useCheckRole from "../../../hooks/useCheckRole";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";

import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import { genClassName } from "../../../utilities/helpersFun";
import style from "./UserDetails.module.scss";

function UserDetails({ className }: PropsBasic) {
  // const [queryParams] = useSearchParams();

  // const { isTrainee, userData } = useCheckRole();
  // let username;
  // let profileID;
  // if (isTrainee) {
  //   username = userData.username;
  //   profileID = userData.profile_id;
  // } else {
  //   username = queryParams.get("username");
  //   profileID = queryParams.get("profileID");
  // }

  // const traineeID = Number(useParams().id);

  const { profileID, traineeID, username, userData } = useGetUserTraineeData();
  console.log(username, userData);
  return (
    <Card className={genClassName(className, style.user_details_container)}>
      <div>
        <FaUserCircle className={style.profile_icon} />
      </div>

      <h2>{username || "Not Active yet"}</h2>
      <div className={style.user_details_links}>
        <Link to={`/${APP_ROUTE.TRAINEES_ROUTE}/${traineeID}`}>
          Edit Details
        </Link>

        <Link
          to={`/${APP_ROUTE.MEASURES_ROUTE}/${APP_ROUTE.MEASURE_EDIT}?username=${username}&profileID=${profileID}`}
        >
          Edit Measures
        </Link>
      </div>
    </Card>
  );
}

export default UserDetails;
