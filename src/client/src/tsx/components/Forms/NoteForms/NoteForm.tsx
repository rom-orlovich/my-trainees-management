import { yupResolver } from "@hookform/resolvers/yup";
import { NotesTable } from "../../../redux/api/interfaceAPI";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { notesSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

export function NoteForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<NotesTable>) {
  return (
    <>
      {" "}
      <h2>{editMode ? "Edit" : "Add"} Note </h2>
      <Form<NotesTable>
        onSubmit={onSubmit}
        formOptions={{
          mode: "onChange",
          defaultValues: defaultValues,
          resolver: yupResolver(notesSchema),
        }}
      >
        {({ register, formState }) => {
          const { name_topic, note_text } = formState.errors;

          return (
            <>
              <InputLabel
                InputProps={{
                  ...register("name_topic"),
                  // isError: !!name_topic,
                }}
                LabelProps={{
                  htmlFor: "name_topic",
                  labelText: "Topic",
                }}
              >
                <InputErrorMessage nameInput="Topic" error={name_topic} />
              </InputLabel>
              <InputLabel
                InputProps={{
                  ...register("note_text"),
                  // isError: !!note_text
                }}
                LabelProps={{
                  htmlFor: "note_text",
                  labelText: "Text",
                }}
              >
                <InputErrorMessage nameInput="Text" error={note_text} />
              </InputLabel>
              <button type="submit">{editMode ? "Edit" : "Add"} </button>
            </>
          );
        }}
      </Form>
    </>
  );
}
