import { measuresApi } from "../../../redux/api/hooksAPI";
import { MeasuresAPI } from "../../../redux/api/interfaceAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MeasureForm } from "./MeasureForms";

export function MeasureAddForm() {
  const [addItem] = measuresApi.useCreateOneItemMutation();

  const handleSubmit = (body: MeasuresAPI) => {
    addFunction({
      addItem,
    })({ ...body });
  };

  return <MeasureForm onSubmit={handleSubmit} />;
}
