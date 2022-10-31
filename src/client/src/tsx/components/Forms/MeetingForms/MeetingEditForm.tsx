/* eslint-disable camelcase */
import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { meetingApi } from "../../../redux/api/hooksAPI";
import { MeetingAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { changeModelState } from "../../../redux/slices/apiSideEffectSlice";

import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MeetingForm } from "./MeetingForm";

export function MeetingEditForm({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const [updateItem] = meetingApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();

  const queriesOptions = { userID: authState.user_id };
  const { data, isLoading, isFetching, isError } =
    meetingApi.useGetItemByIDQuery({ id, ...queriesOptions });

  const handleSubmit = ({ meeting_id, activity_name, ...body }: MeetingAPI) =>
    updateFunction({
      id,
      updateItem,
    })(body).then((value) => {
      dispatch(changeModelState());
      return value;
    });

  return (
    <LoadingSpinner
      nameData="Meeting"
      stateData={{
        data,
        isLoading,
        isFetching,
        isError,
      }}
    >
      {(data) => (
        <MeetingForm
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={data}
        />
      )}
    </LoadingSpinner>
  );
}
