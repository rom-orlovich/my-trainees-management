import useGetQueryParams from "../../../hooks/useGetQueryParams";
import { measuresApi } from "../../../redux/api/hooksAPI";
import { MeasuresAPI } from "../../../redux/api/interfaceAPI";
import { formatDate } from "../../../utilities/helpersFun";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MeasureForm } from "./MeasureForms";

export function MeasureAddForm() {
  const [addItem] = measuresApi.useCreateOneItemMutation();
  const profileID = useGetQueryParams("profileID");
  console.log(profileID);
  const handleSubmit = (body: MeasuresAPI) => {
    addFunction({
      addItem,
    })({ ...body, profile_id: Number(profileID) });
  };

  return <MeasureForm onSubmit={handleSubmit} />;
}
