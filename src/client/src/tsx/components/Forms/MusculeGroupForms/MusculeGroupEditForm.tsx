import { useParams } from "react-router-dom";
import { musclesGroupApi } from "../../../redux/api/hooksAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MusculeGroupForm } from "./MusculeGroupForm";

export function MusculeGroupEditForm() {
  const id = Number(useParams().id);
  const [updateItem] = musclesGroupApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    musclesGroupApi.useGetItemByIDQuery(id);
  const handleSubmit = updateFunction({
    updateItem,
    id,
  });

  return (
    <>
      <LoadingSpinner
        nameData="Muscule Group"
        stateData={{ isLoading, isFetching, isError, data }}
      >
        {data && (
          <MusculeGroupForm
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={data}
          ></MusculeGroupForm>
        )}
      </LoadingSpinner>
    </>
  );
}
