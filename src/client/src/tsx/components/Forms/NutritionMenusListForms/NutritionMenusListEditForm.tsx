import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { NUTRITION_MENU_NAME_DATA } from "../../../pages/NutritionMenusListPage/NutritionMenusListPage";
import {
  nutritionMenusListApi,
  trainingProgramsListApi,
} from "../../../redux/api/hooksAPI";
import { NutritionMenuTableApi } from "../../../redux/api/interfaceAPI";
import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { NutritionMenusListForm } from "./NutritionMenusListForm";

export function NutritionMenusListEditForm() {
  const id = Number(useParams().nutritionMenuID);
  const [updateItem] = trainingProgramsListApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();

  const queriesOptions = { userID: authState.user_id };
  const { data, isLoading, isFetching, isError } =
    nutritionMenusListApi.useGetItemByIDQuery({ id, ...queriesOptions });

  const handleSubmit = (body: NutritionMenuTableApi) =>
    updateFunction({
      id,
      updateItem,
    })(body);

  return (
    <LoadingSpinner
      nameData={`${NUTRITION_MENU_NAME_DATA}s List`}
      stateData={{
        data,
        isLoading,
        isFetching,
        isError,
      }}
    >
      {(data) => (
        <NutritionMenusListForm
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={{
            ...data,
            profile_id: data.profile_id,
            date_start: formatDate(data.date_start) as any,
            date_end: data.date_end ? formatDate(data.date_end) : (null as any),
            note_topic: data.note_topic,
            note_text: data.note_text,
          }}
        />
      )}
    </LoadingSpinner>
  );
}
