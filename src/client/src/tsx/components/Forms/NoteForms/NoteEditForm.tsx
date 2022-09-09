import { useParams } from "react-router-dom";
import { notesAPI } from "../../../redux/api/hooksAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { NoteForm } from "./NoteForm";

export function NoteEditForm() {
  const id = Number(useParams().id);
  const [updateItem, state] = notesAPI.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    notesAPI.useGetItemByIDQuery(id);
  const handleSubmit = updateFunction({
    updateItem,
    id,
  });

  return (
    <LoadingSpinner
      nameData="Note"
      stateData={{ data, isLoading, isFetching, isError }}
    >
      <NoteForm
        editMode={true}
        onSubmit={handleSubmit}
        defaultValues={data}
      ></NoteForm>
    </LoadingSpinner>
  );
}
