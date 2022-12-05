/* eslint-disable camelcase */

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { meetingApi } from "../../../redux/api/hooksAPI";
import { MeetingAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { closeModel } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MeetingForm } from "./MeetingForm";

export function MeetingEditForm({ meetingID }: { meetingID: number }) {
  const dispatch = useAppDispatch();
  const [updateItem] = meetingApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();

  const queriesOptions = { userID: authState.user_id };
  const { data, isLoading, isFetching, isError } =
    meetingApi.useGetItemByIDQuery({ id: meetingID, ...queriesOptions });

  const handleSubmit = ({
    meeting_id,
    group_name,
    activity_name,
    city_name,
    street,
    ...body
  }: MeetingAPI) =>
    updateFunction({
      id: meetingID,
      updateItem,
    })(body).then((value) => {
      dispatch(closeModel());
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
