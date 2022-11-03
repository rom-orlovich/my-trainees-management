import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import {
  participantsGroupsListApi,
  trainingProgramsListApi,
} from "../../../redux/api/hooksAPI";
import {
  ParticipantsGroupsListTableAPI,
  TrainingProgramsListTableAPI,
} from "../../../redux/api/interfaceAPI";
import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ParticipantsGroupsListForm } from "./ParticipantsGroupsListForm";

export function ParticipantsGroupsListEditForm() {
  const id = Number(useParams().id);
  const [updateItem] = participantsGroupsListApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();

  const queriesOptions = { userID: authState.user_id };
  const { data, isLoading, isFetching, isError } =
    participantsGroupsListApi.useGetItemByIDQuery({ id, ...queriesOptions });

  const handleSubmit = (body: ParticipantsGroupsListTableAPI) =>
    updateFunction({
      id,
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
