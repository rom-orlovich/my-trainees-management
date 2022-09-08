import { notesAPI } from "../../../redux/api/hooksAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { NoteForm } from "./NoteForm";

export function NoteAddForm() {
  const [addItem, state] = notesAPI.useCreateOneItemMutation();

  const handleSubmit = addFunction({
    addItem,
  });

  return <NoteForm onSubmit={handleSubmit}></NoteForm>;
}
