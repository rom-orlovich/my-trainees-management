/* eslint-disable camelcase */

import { meetingApi } from "../../../redux/api/hooksAPI";
import { MeetingAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import {
  changeModelState,
  disableGoPrevPage,
} from "../../../redux/slices/apiSideEffectSlice";

import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { MeetingForm } from "./MeetingForm";

export function MeetingAddForm() {
  const [addItem] = meetingApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = async ({
    meeting_id,
    activity_name,
    ...body
  }: MeetingAPI) => {
    dispatch(disableGoPrevPage());
    addFunction({
      addItem,
    })({ ...body }).then((res) => {
      dispatch(changeModelState());
      return res;
    });
  };

  return <MeetingForm onSubmit={handleSubmit} />;
}
