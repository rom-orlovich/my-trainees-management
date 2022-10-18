/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { equipmentsApi, musclesGroupApi } from "../../../redux/api/hooksAPI";
import {
  EquipmentsTableAPI,
  ExercisesTableAPI,
  MusclesGroupTableAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppSelector } from "../../../redux/hooks";
import { getAuthState } from "../../../redux/slices/authSlice";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import AutocompleteInputRHF from "../../baseComponents/RHF-Components/AutocompleteInput/AutocompleteInputRHF";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { exercisesListSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

export function ExerciseForm({
  onSubmit,
  defaultValues,
  editMode,
  fromProps,
}: GeneralFormProps<ExercisesTableAPI>) {
  const authState = useGetUserLoginData();

  const queriesOptions = { userID: authState.user_id };
  return (
    <>
      <Form<ExercisesTableAPI>
        formProps={{
          className: ` ${fromProps?.className}`,
          ...fromProps,
        }}
        editMode={editMode}
        onSubmit={onSubmit}
        nameForm={"Exercise"}
        formOptions={{
          defaultValues: {
            user_id: authState.user_id,
            exercise_id: defaultValues?.exercise_id,
            exercise_name: defaultValues?.exercise_name,
            equipment_id: defaultValues?.equipment_id,
            muscles_group_id: defaultValues?.muscles_group_id,
          },

          resolver: yupResolver(exercisesListSchema),
        }}
      >
        {({ register, formState, control }) => {
          const { exercise_name } = formState.errors;

          return (
            <>
              <InputLabel
                InputProps={{ ...register("exercise_name") }}
                LabelProps={{
                  htmlFor: "exercise_name",
                  labelText: "Exercise",
                }}
              >
                <InputErrorMessage nameInput="Exercise" error={exercise_name} />
              </InputLabel>

              <AutocompleteInputRHF<ExercisesTableAPI, EquipmentsTableAPI>
                name="equipment_id"
                control={control}
                AutocompleteInputProps={{
                  queriesOptions,
                  defaultValueID: defaultValues?.equipment_id,
                  InputLabelProps: {
                    LabelProps: { labelText: "Equipment" },
                    InputProps: { placeholder: "Search Equipment" },
                  },
                  addOption: {
                    link: `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.EQUIPMENTS_LIST_ROUTE}/${APP_ROUTE.EQUIPMENT_ADD}`,
                  },
                  loadingSpinnerResult: { nameData: "Equipment" },
                  useGetData: equipmentsApi.useGetItemsQuery,
                  id: "equipment_id",
                  keys: ["equipment_name"],
                }}
              />

              <AutocompleteInputRHF<ExercisesTableAPI, MusclesGroupTableAPI>
                name="muscles_group_id"
                control={control}
                AutocompleteInputProps={{
                  defaultValueID: defaultValues?.exercise_id,

                  InputLabelProps: {
                    LabelProps: { labelText: "Muscles Group" },

                    InputProps: { placeholder: "Search Muscles Group" },
                  },
                  addOption: {
                    link: `/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}/${APP_ROUTE.MUSCLES_GROUP_ADD}`,
                  },
                  loadingSpinnerResult: { nameData: "Muscles Group" },
                  useGetData: musclesGroupApi.useGetItemsQuery,
                  id: "muscles_group_id",
                  keys: ["muscles_group_name"],
                }}
              />
            </>
          );
        }}
      </Form>
    </>
  );
}
