import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { trainingProgramsListApi } from "../../../redux/api/hooksAPI";
import { TrainingProgramsListTableAPI } from "../../../redux/api/interfaceAPI";
import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { TrainingProgramListForms } from "./TrainingProgramListForm";

export function TrainingProgramsListEditForm() {
  const id = Number(useParams().id);
  const [updateItem] = trainingProgramsListApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();

  const queriesOptions = { userID: authState.user_id };
  const { data, isLoading, isFetching, isError } =
    trainingProgramsListApi.useGetItemByIDQuery({ id, ...queriesOptions });

  const handleSubmit = (body: TrainingProgramsListTableAPI) =>
    updateFunction({
      id,
      updateItem,
    })(body);

  return (
    <LoadingSpinner
      nameData="Training Programs List"
      stateData={{
        data,
        isLoading,
        isFetching,
        isError,
      }}
    >
      {(data) => (
        <TrainingProgramListForms
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={{
            ...data,
            trainee_id: data.trainee_id,
            date_start: formatDate(data.date_start) as any,
            date_end: data.date_end ? formatDate(data.date_end) : (null as any),
            note_topic: data?.note_topic,
            note_text: data.note_text,
          }}
        ></TrainingProgramListForms>
      )}
    </LoadingSpinner>
  );
}
