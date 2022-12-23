/* eslint-disable camelcase */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { participantsGroupsListApi } from "../../../redux/api/hooksAPI";
import {
  ParticipantsGroupsListTableAPI,
  ResponseMutationAPI,
} from "../../../redux/api/interfaceAPI";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { disableGoPrevPage } from "../../../redux/slices/apiSideEffectSlice";
import { preModel } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

import { APP_ROUTE } from "../../../routes2/appRoutesConstants";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ParticipantsGroupsListForm } from "./ParticipantsGroupsListForm";

export function ParticipantsGroupsListAddForm({}) {
  const navigate = useNavigate();
  const [addItem] = participantsGroupsListApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  // resetGoPrevPagesState disable the behavior of returning to pre page , after submit form.
  // Instead after submit this form the function will move the user to his training program's exercises list.
  useEffect(() => {
    dispatch(disableGoPrevPage());
  }, []);

  const handleSubmit = ({
    participants_groups_list_id,
    ...body
  }: ParticipantsGroupsListTableAPI) =>
    addFunction({
      addItem,
    })(body).then((response) => {
      const Response = response as unknown as { data: ResponseMutationAPI };

      // navigate(
      //   `/${APP_ROUTE.SETTINGS_ROUTE}/${
      //     APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE
      //   }/${Number(Response.data.id)}/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}`
      // );

      return Response;
    });
  return <ParticipantsGroupsListForm onSubmit={handleSubmit} />;
}
