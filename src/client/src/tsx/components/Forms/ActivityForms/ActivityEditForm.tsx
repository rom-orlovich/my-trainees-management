import { useParams } from "react-router-dom";
import { activitiesApi, musclesGroupApi } from "../../../redux/api/hooksAPI";
import { ActivitiesTableAPI } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ActivityForm } from "./ActivityForm";

export function ActivityEditForm() {
  const id = Number(useParams().id);
  const [updateItem] = activitiesApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    activitiesApi.useGetItemByIDQuery({ id });

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
