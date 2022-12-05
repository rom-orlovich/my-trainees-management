/* eslint-disable camelcase */

import { meetingApi } from "../../../redux/api/hooksAPI";
import { MeetingAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { disableGoPrevPage } from "../../../redux/slices/apiSideEffectSlice";
import { closeModel } from "../../../redux/slices/modelControllerSlices/modelControllerSlice";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MeetingForm } from "./MeetingForm";

export function MeetingAddForm() {
  const [addItem] = meetingApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = async ({
    meeting_id,
    activity_name,
    city_name,
    street,
    ...body
  }: MeetingAPI) => {
    dispatch(disableGoPrevPage());
    return addFunction({
      addItem,
    })({ ...body }).then((res) => {
      dispatch(closeModel());
      return res;
    });
  };

  return <MeetingForm onSubmit={handleSubmit} />;
}
