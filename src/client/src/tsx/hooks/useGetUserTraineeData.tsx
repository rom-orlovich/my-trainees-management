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
  } else {
    username = String(queryParams.get("username") || "");
    profileID = Number(queryParams.get("profileID"));
    traineeID =
      Number(useParams().traineeID) || Number(queryParams.get("traineeID"));
  }

  return {
    userData,
    username,
    traineeID,
    profileID,
    trainerUserID: userData?.trainer_user_id,
    userID: userData?.user_id,
    isTrainee,
  };
}

export default useGetUserTraineeData;
