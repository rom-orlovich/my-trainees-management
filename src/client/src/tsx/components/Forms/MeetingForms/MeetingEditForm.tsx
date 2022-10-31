import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { meetingApi } from "../../../redux/api/hooksAPI";
import { MeetingsTableAPI } from "../../../redux/api/interfaceAPI";

import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MeetingForm } from "./MeetingForm";

export function MeetingEditForm({ id }: { id: number }) {
  const [updateItem] = meetingApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();

  const queriesOptions = { userID: authState.user_id };
  const { data, isLoading, isFetching, isError } =
    meetingApi.useGetItemByIDQuery({ id, ...queriesOptions });

  const handleSubmit = (body: MeetingsTableAPI) =>
    updateFunction({
      id,
      updateItem,
    })(body);

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
