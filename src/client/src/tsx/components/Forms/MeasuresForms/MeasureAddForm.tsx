import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";

import { measuresApi } from "../../../redux/api/hooksAPI";
import { MeasuresRawAPI } from "../../../redux/api/interfaceAPI";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MeasureForm } from "./MeasureForms";

export function MeasureAddForm() {
  const [addItem] = measuresApi.useCreateOneItemMutation();
  const { profileID } = useGetUserTraineeData();

  const handleSubmit = (body: MeasuresRawAPI) => {
    addFunction({
      addItem,
    })({ ...body, profile_id: Number(profileID) });
  };

  return <MeasureForm onSubmit={handleSubmit} />;
}
