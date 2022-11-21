import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { participantsGroupsListApi } from "../../../redux/api/hooksAPI";
import { ParticipantsGroupsListTableAPI } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ParticipantsGroupsListForm } from "./ParticipantsGroupsListForm";

export function ParticipantsGroupsListEditForm({ id }: { id?: number }) {
  // const id = Number(useParams().id);
  const ID = id || 0;
  const [updateItem] = participantsGroupsListApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();

  const queriesOptions = { userID: authState.user_id };
  const { data, isLoading, isFetching, isError } =
    participantsGroupsListApi.useGetItemByIDQuery({
      id: ID,
      ...queriesOptions,
    });

  const handleSubmit = (body: ParticipantsGroupsListTableAPI) =>
    updateFunction({
      id: ID,
      updateItem,
    })(body);

  return (
    <LoadingSpinner
      nameData="Participants Groups List"
      stateData={{
        data,
        isLoading,
        isFetching,
        isError,
      }}
    >
      {(data) => (
        <ParticipantsGroupsListForm
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={data}
        />
      )}
    </LoadingSpinner>
  );
}
