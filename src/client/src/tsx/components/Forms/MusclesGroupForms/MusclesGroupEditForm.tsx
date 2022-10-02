import { useParams } from "react-router-dom";
import { musclesGroupApi } from "../../../redux/api/hooksAPI";
import { MusclesGroupTableAPI } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MusclesGroupForm } from "./MusclesGroupForm";

export function MusclesGroupEditForm() {
  const id = Number(useParams().id);
  const [updateItem] = musclesGroupApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    musclesGroupApi.useGetItemByIDQuery(id);
  const handleSubmit = ({ muscles_group_id, ...rest }: MusclesGroupTableAPI) =>
    updateFunction({
      updateItem,
      id,
    })(rest);

  return (
    <>
      <LoadingSpinner
        nameData="Muscles Group"
        stateData={{ isLoading, isFetching, isError, data }}
      >
        {data && (
          <MusclesGroupForm
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={data}
          ></MusclesGroupForm>
        )}
      </LoadingSpinner>
    </>
  );
}
