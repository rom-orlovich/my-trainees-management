import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { activitiesApi, musclesGroupApi } from "../../../redux/api/hooksAPI";
import { ActivitiesTableAPI } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ActivityForm } from "./ActivityForm";

export function ActivityEditForm() {
  const id = Number(useParams().id);
  const [updateItem] = activitiesApi.useUpdateItemMutation();
  const authState = useGetUserLoginData();
  const queriesOptions = { userID: authState.user_id };
  const { data, isLoading, isFetching, isError } =
    activitiesApi.useGetItemByIDQuery({ id, ...queriesOptions });

  const handleSubmit = (body: ActivitiesTableAPI) =>
    updateFunction({
      updateItem,
      id,
    })(body);

  return (
    <>
      <LoadingSpinner
        nameData="Activity"
        stateData={{ isLoading, isFetching, isError, data }}
      >
        {data && (
          <ActivityForm
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={data}
          />
        )}
      </LoadingSpinner>
    </>
  );
}
