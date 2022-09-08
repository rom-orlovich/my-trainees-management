import { useParams } from "react-router-dom";
import { trainingProgramsListApi } from "../../../redux/api/hooksAPI";
import { formatDate } from "../../../utlities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import {
  TrainingProgramsListFormProps,
  TrainingProgramListForms,
} from "./TrainingProgramListForm";

export function TrainingProgramsListEditForm() {
  const id = Number(useParams().id);
  const [updateItem] = trainingProgramsListApi.useUpdateComplexItemMutation();

  const { data, isLoading, isFetching, isError } =
    trainingProgramsListApi.useGetItemByIDQuery(id);

  const defaultData: TrainingProgramsListFormProps = data
    ? {
        ...data,
        profile_id: data.profile_id,
        date_start: formatDate(data.date_start) as any,
        date_end: data.date_end ? formatDate(data.date_end) : (null as any),
        note_id: data?.note_id,
        name_topic: data?.name_topic,
        note_text: data.note_text,
      }
    : ({} as TrainingProgramsListFormProps);

  const handleSubmit = (body: TrainingProgramsListFormProps) => {
    const { note_id, name_topic, note_text, ...rest } = body;

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
