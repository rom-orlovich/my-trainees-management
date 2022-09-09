import { yupResolver } from "@hookform/resolvers/yup";
import { NotesTable } from "../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../routes/routesConstants";
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
      <Form<NotesTable>
        onSubmit={onSubmit}
        nameForm="Note"
        editMode={editMode}
        // pathMove={`/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.NOTES_ROUTE}`}
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
                InputProps={{ ...register("name_topic") }}
                LabelProps={{
                  htmlFor: "name_topic",
                  labelText: "Topic",
                }}
              >
                <InputErrorMessage nameInput="Topic" error={name_topic} />
              </InputLabel>
              <InputLabel
                TextAreaProps={{ ...register("note_text") }}
                LabelProps={{
                  htmlFor: "note_text",
                  labelText: "Text",
                }}
              >
                <InputErrorMessage nameInput="Text" error={note_text} />
              </InputLabel>
            </>
          );
        }}
      </Form>
    </>
  );
}
