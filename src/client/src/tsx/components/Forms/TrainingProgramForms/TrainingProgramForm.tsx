/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";
import { exercisesApi } from "../../../redux/api/hooksAPI";
import {
  ExercisesTableAPI,
  TrainingProgramExerciseOmit,
} from "../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { formatDate } from "../../../utilities/helpersFun";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { trainingProgramSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

export default function TrainingProgramForms({
  onSubmit,
  defaultValues,
  editMode,
  fromProps,
}: GeneralFormProps<TrainingProgramExerciseOmit>) {
  const { trainerUserID, userID, isTrainee } = useGetUserTraineeData();
  const queriesOptions = isTrainee ? { trainerUserID, userID } : { userID };
  return (
    <>
      <Form<TrainingProgramExerciseOmit>
        onSubmit={onSubmit}
        editMode={editMode}
        nameForm={"Training Exercise"}
        formProps={{
          className: ` ${fromProps?.className}`,
          ...fromProps,
        }}
        formOptions={{
          defaultValues: {
            ...defaultValues,
            update_date: formatDate(
              defaultValues?.update_date || new Date()
            ) as any,
          },
          resolver: yupResolver(trainingProgramSchema),
        }}
      >
        {({ register, formState, control }) => {
          const {
            update_date,
            sets,
            rpe,
            reps,
            rest,
            intensity,
            note_topic,
            note_text,
          } = formState.errors;

          return (
            <>
              <InputLabel
                InputProps={{
                  ...register("update_date"),
                  type: "date",
                }}
                LabelProps={{
                  htmlFor: "update_date",
                  labelText: "Update Date",
                }}
              >
                <InputErrorMessage
                  nameInput="update_date"
                  error={update_date}
                />
              </InputLabel>

              <AutocompleteInputRHF<
                TrainingProgramExerciseOmit,
                ExercisesTableAPI
              >
                name="exercise_id"
                control={control}
                AutocompleteInputProps={{
                  queriesOptions,
                  defaultValueID: defaultValues?.exercise_id,

                  InputLabelProps: {
                    LabelProps: { labelText: "Exercise" },
                    InputProps: { placeholder: "Search Exercise" },
                  },
                  addOption: {
                    link: `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.EXERCISES_LIST_ROUTE}/${APP_ROUTE.EXERCISE_ADD}`,
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
