import { musculesGroupApi } from "../../../redux/api/hooksAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MusculeGroupForm } from "./MusculeGroupForm";

export function MusculeGroupEditForm({ id }: { id: number }) {
  const [updateItem] = musculesGroupApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    musculesGroupApi.useGetItemByIDQuery(id);
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
