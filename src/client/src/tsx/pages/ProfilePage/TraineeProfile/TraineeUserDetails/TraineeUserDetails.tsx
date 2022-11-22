import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PropsBasic } from "../../../../components/baseComponents/baseComponentsTypes";
import Card from "../../../../components/baseComponents/Card/Card";

import useGetUserTraineeData from "../../../../hooks/useGetUserTraineeData";

import { APP_ROUTE } from "../../../../routes/appRoutesConstants";

import { genClassName } from "../../../../utilities/helpersFun";
import style from "../../UserDetailsStyle/UserDetails.module.scss";

function TraineeUserDetails({ className }: PropsBasic) {
  const { profileID, traineeID, username } = useGetUserTraineeData();

  return (
    <Card className={genClassName(className, style.user_details_container)}>
      <div>
        <FaUserCircle className={style.profile_icon} />
      </div>

      <h2>{username || "Not Active Yet"}</h2>
      <div className={style.user_details_links}>
        {username ? (
          <> </>
        ) : (
          <button className={style.resend_email}> Resend Email</button>
        )}
        <Link
          to={`/${APP_ROUTE.TRAINEES_ROUTE}/${APP_ROUTE.TRAINEES_PERSONAL_DETAILS_ROUTE}`}
        >
          Edit Details
        </Link>

        {!!profileID && (
          <Link
            to={`/${APP_ROUTE.MEASURES_ROUTE}/${APP_ROUTE.MEASURE_EDIT}?username=${username}&profileID=${profileID}`}
          >
            Edit Measures
          </Link>
        )}
      </div>
    </Card>
  );
}

export default TraineeUserDetails;
