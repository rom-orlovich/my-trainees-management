import { useParams } from "react-router-dom";
import { trainingProgramsListApi } from "../../../redux/api/hooksAPI";
import { TrainingProgramsListTableAPI } from "../../../redux/api/interfaceAPI";
import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { TrainingProgramListForms } from "./TrainingProgramListForm";

export function TrainingProgramsListEditForm() {
  const id = Number(useParams().id);
  const [updateItem] = trainingProgramsListApi.useUpdateItemMutation();

  const { data, isLoading, isFetching, isError } =
    trainingProgramsListApi.useGetItemByIDQuery(id);

  const defaultData: TrainingProgramsListTableAPI = data
    ? {
        ...data,
        profile_id: data.profile_id,
        date_start: formatDate(data.date_start) as any,
        date_end: data.date_end ? formatDate(data.date_end) : (null as any),

        note_topic: data?.note_topic,
        note_text: data.note_text,
      }
    : ({} as TrainingProgramsListTableAPI);

  const handleSubmit = (body: TrainingProgramsListTableAPI) => {
    const { note_topic, note_text, ...rest } = body;

    updateFunction({
      updateItem,
      id,
    })({ ...body });
  };

  return (
    <LoadingSpinner
      nameData="Training Programs List"
      stateData={{
        data: data,
        isLoading,
        isFetching,
        isError,
      }}
    >
      <TrainingProgramListForms
        editMode={true}
        onSubmit={handleSubmit}
        defaultValues={defaultData}
      ></TrainingProgramListForms>
    </LoadingSpinner>
  );
}
