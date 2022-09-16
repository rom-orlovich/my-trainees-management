import { yupResolver } from "@hookform/resolvers/yup";
import { TrainingProgramsListTable } from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { trainingProgramsListSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

export function TrainingProgramListForms({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<TrainingProgramsListTable>) {
  const dateNow = new Date();
  return (
    <>
      <Form<TrainingProgramsListTable>
        buttonNext={!editMode}
        heading={`Training Program ${!editMode ? "Building" : "Edit"}`}
        onSubmit={onSubmit}
        editMode={editMode}
        formOptions={{
          mode: "onChange",
          defaultValues: defaultValues,
          resolver: yupResolver(trainingProgramsListSchema),
        }}
      >
        {({ register, formState }) => {
          const { date_start, date_end, type_program, note_topic, note_text } =
            formState.errors;

          return (
            <>
              <InputLabel
                InputProps={{ ...register("type_program") }}
                LabelProps={{
                  htmlFor: "type_program",
                  labelText: "Program's type",
                }}
              >
                <InputErrorMessage
                  nameInput="Start Program"
                  error={type_program}
                />
              </InputLabel>
              <InputLabel
                InputProps={{
                  ...register("date_start"),
                  type: "date",
                  defaultValue: formatDate(dateNow) as any,
                }}
                LabelProps={{
                  htmlFor: "date_start",
                  labelText: "Start Program",
                }}
              >
                <InputErrorMessage
                  nameInput="Start Program"
                  error={date_start}
                />
              </InputLabel>
              <InputLabel
                InputProps={{
                  ...register("date_end"),
                  type: "date",

                  defaultValue: formatDate(
                    new Date(dateNow.setDate(dateNow.getDate() + 1))
                  ) as any,
                }}
                LabelProps={{
                  htmlFor: "date_end",
                  labelText: "End Program",
                }}
              >
                <InputErrorMessage nameInput="End Program" error={date_end} />
              </InputLabel>
              <InputLabel
                InputProps={{ ...register("note_topic") }}
                LabelProps={{
                  htmlFor: "note_topic",
                  labelText: "Topic",
                }}
              >
                <InputErrorMessage nameInput="Topic" error={note_topic} />
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
