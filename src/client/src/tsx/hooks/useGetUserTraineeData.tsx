import { useParams, useSearchParams } from "react-router-dom";
import useCheckRole from "./useCheckRole";

function useGetUserTraineeData() {
  const [queryParams] = useSearchParams();

  const { isTrainee, userData } = useCheckRole();
  let traineeID;
  let username;
  let profileID;

  if (isTrainee) {
    traineeID = Number(userData.trainee_id || 0);
    username = userData.username;
    profileID = userData.profile_id;
  } else {
    username = String(queryParams.get("username") || "_");
    profileID = Number(queryParams.get("profileID"));
    traineeID = Number(useParams().id);
  }

  return {
    userData,
    username,
    traineeID,
    profileID,
    userID: userData?.user_id,
    isTrainee,
  };
}

export default useGetUserTraineeData;
