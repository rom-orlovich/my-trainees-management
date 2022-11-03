/* eslint-disable camelcase */
import { useNavigate, useParams } from "react-router-dom";
import { participantsGroupsListApi } from "../../../redux/api/hooksAPI";
import {
  ParticipantsGroupsListTableAPI,
  ResponseMutationAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { disableGoPrevPage } from "../../../redux/slices/apiSideEffectSlice";

import { APP_ROUTE } from "../../../routes/appRoutesConstants";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ParticipantsGroupsListForm } from "./ParticipantsGroupsListForm";

export function ParticipantsGroupsListAddForm({
  className,
}: {
  className?: string;
}) {
  const traineeID = Number(useParams().id);

  const navigate = useNavigate();
  const [addItem] = participantsGroupsListApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = ({
    participants_groups_list_id,
    ...body
  }: ParticipantsGroupsListTableAPI) => {
    // resetGoPrevPagesState disable the behavior of returning to pre page , after submit form.
    // Instead after submit this form the function will move the user to his training program's exercises list.
    dispatch(disableGoPrevPage());

    return addFunction({
      addItem,
    })({ ...body, trainee_id: traineeID }).then((response) => {
      const Response = response as unknown as { data: ResponseMutationAPI };

      navigate(
        `/${APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}/${Number(
          Response.data.id
        )}/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}`
      );

      return Response;
    });
  };

  return <ParticipantsGroupsListForm onSubmit={handleSubmit} />;
}
