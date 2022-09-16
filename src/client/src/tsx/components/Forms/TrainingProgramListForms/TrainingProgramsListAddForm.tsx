import { useNavigate, useParams } from "react-router-dom";
import { trainingProgramsListApi } from "../../../redux/api/hooksAPI";
import {
  ResponseMutationAPI,
  TrainingProgramsListTable,
} from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { resetGoPrevPageState } from "../../../redux/slices/apiSideEffectSlice";
import {} from "../../../redux/slices/formValuesStateSlice";
import { APP_ROUTE } from "../../../routes/routesConstants";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import {
  TrainingProgramListForms,
  // TrainingProgramsListFormProps,
} from "./TrainingProgramListForm";

export function TrainingProgramsListAddForm({
  // profile_id,
  className,
}: {
  // profile_id: number;
  className?: string;
}) {
  const profile_id = Number(useParams().id);

  const navigate = useNavigate();
  const [addItem] = trainingProgramsListApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = (body: TrainingProgramsListTable) => {
    // resetGoPrevPagesState disable the behavior of returning to pre page , after submit form.
    // Instead after submit this form the function will move the user to his training program's exercises list.
    dispatch(resetGoPrevPageState());
    addFunction({
      addItem,
    })({ ...body, profile_id: profile_id }).then((response) => {
      const Response = response as unknown as { data: ResponseMutationAPI };

      navigate(
        `/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/${Number(
          Response.data.id
        )}/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}`
      );
    });
  };

  return <TrainingProgramListForms onSubmit={handleSubmit} />;
}
