import { yupResolver } from "@hookform/resolvers/yup";
import { exercisesApi } from "../../../redux/api/hooksAPI";
import {
  ExercisesTable,
  TrainingProgramExerciseOmit,
} from "../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../routes/routesConstants";
import {
  FormWithNotesProps,
  GeneralFormProps,
} from "../../baseComponents/baseComponentsTypes";

import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import {
  notesSchema,
  trainingProgramSchema,
} from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

export type TrainingProgramFormProps =
  FormWithNotesProps<TrainingProgramExerciseOmit>;

export default function TrainingProgramForms({
  onSubmit,
  defaultValues,
  editMode,
  fromProps,
}: GeneralFormProps<TrainingProgramFormProps>) {
  return (
    <>
      <Form<TrainingProgramFormProps>
        onSubmit={onSubmit}
        editMode={editMode}
        nameForm={"Training Exercise"}
        formProps={{
          className: " " + fromProps?.className,
          ...fromProps,
        }}
        formOptions={{
          mode: "onBlur",

          defaultValues: defaultValues,
          resolver: yupResolver(trainingProgramSchema.concat(notesSchema)),
        }}
      >
        {({ register, formState, control }) => {
          const { sets, rpe, reps, rest, intensity, name_topic, note_text } =
            formState.errors;

          return (
            <>
              <AutocompleteInputRHF<TrainingProgramFormProps, ExercisesTable>
                name="exercise_id"
                control={control}
                AutocompleteInputProps={{
                  defaultValueID: defaultValues?.exercise_id,
                  InputLabelProps: {
                    LabelProps: { labelText: "Exercise" },

                    InputProps: { placeholder: "Search Exercise" },
                  },
                  addOption: {
                    link: `/${APP_ROUTE.EXERCISES_LIST_ROUTE}/${APP_ROUTE.EXERCISE_ADD}`,
                  },
                  loadingSpinnerResult: { nameData: "Exercise" },
                  useGetData: exercisesApi.useGetItemsQuery,
                  id: "exercise_id",
                  keys: ["exercise_name"],
                }}
              />
              <InputLabel
                InputProps={{
                  ...register("sets"),
                  type: "number",
                  min: 0,
                  defaultValue: 1,
                }}
                LabelProps={{
                  htmlFor: "sets",
                  labelText: "Sets",
                }}
              >
                <InputErrorMessage nameInput="Sets" error={sets} />
              </InputLabel>

              <InputLabel
                InputProps={{ ...register("reps") }}
                LabelProps={{
                  htmlFor: "reps",
                  labelText: "Reps",
                }}
              >
                <InputErrorMessage nameInput="reps" error={reps} />
              </InputLabel>

              <InputLabel
                InputProps={{
                  ...register("rest"),
                }}
                LabelProps={{
                  htmlFor: "rest",
                  labelText: "Rest",
                }}
              >
                <InputErrorMessage nameInput="Rest" error={rest} />
              </InputLabel>

              <InputLabel
                InputProps={{
                  ...register("rpe"),
                  type: "number",
                  defaultValue: 1,
                  min: 1,
                }}
                LabelProps={{
                  htmlFor: "rpe",
                  labelText: "RPE",
                }}
              >
                <InputErrorMessage nameInput="RPE" error={rpe} />
              </InputLabel>

              <InputLabel
                InputProps={{ ...register("intensity"), type: "string" }}
                LabelProps={{
                  htmlFor: "intensity",
                  labelText: "Intensity",
                }}
              >
                <InputErrorMessage nameInput="Intensity" error={intensity} />
              </InputLabel>
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
