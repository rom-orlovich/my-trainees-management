/* eslint-disable camelcase */
import { useParams } from "react-router-dom";
import {
  meetingApi,
  trainingProgramsListApi,
} from "../../../redux/api/hooksAPI";
import {
  MeetingsTableAPI,
  TrainingProgramsListTableAPI,
} from "../../../redux/api/interfaceAPI";
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
  const handleSubmit = ({ ...body }: MeetingsTableAPI) => {
    dispatch(disableGoPrevPage());

    return addFunction({
      addItem,
    })({ ...body }).then(() => {
      dispatch(changeModelState());
    });
  };

  return <MeetingForm onSubmit={handleSubmit} />;
}
