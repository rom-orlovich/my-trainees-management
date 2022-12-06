/* eslint-disable camelcase */
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { NUTRITION_MENU_NAME_DATA } from "../../../pages/NutritionMenusListPage/NutritionMenusListPage";
import { NutritionMenuTableApi } from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";

import { GeneralFormProps } from "../../baseComponents/baseComponentsTypes";
import Form from "../../baseComponents/RHF-Components/Form/Form";
import { nutritionMenusListSchema } from "../../baseComponents/RHF-Components/formsSchemas";
import InputErrorMessage from "../../baseComponents/RHF-Components/InputErrorMessage";
import { InputLabel } from "../../baseComponents/RHF-Components/InputLabel/InputLabel";

export function NutritionMenusListForm({
  onSubmit,
  defaultValues,
  editMode,
}: GeneralFormProps<NutritionMenuTableApi>) {
  const dateNow = new Date();
  const { user_id } = useGetUserLoginData();
  const profileID = Number(useParams().id);
  return (
    <>
      <Form<NutritionMenuTableApi>
        buttonNext={!editMode}
        heading={`${NUTRITION_MENU_NAME_DATA} ${
          !editMode ? "Building" : "Edit"
        }`}
        onSubmit={onSubmit}
        editMode={editMode}
        formOptions={{
          defaultValues: { ...defaultValues, user_id, profile_id: profileID },
          resolver: yupResolver(nutritionMenusListSchema),
        }}
      >
        {({ register, formState }) => {
          const { date_start, date_end, note_topic, note_text } =
            formState.errors;
          return (
            <>
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
              <div style={{ width: "100%" }}>
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
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}
