import React from "react";
import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { participantsGroupApi } from "../../../redux/api/hooksAPI";
import { ParticipantsGroupTableAPI } from "../../../redux/api/interfaceAPI";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ParticipantsGroupForm } from "./ParticipantsGroupForm";

export function ParticipantsGroupEditForm() {
  const id = Number(useParams().id);
  const [updateItem, state] = participantsGroupApi.useUpdateItemMutation();
  const { data, isLoading, isFetching, isError } =
    participantsGroupApi.useGetItemByIDQuery({
      id,
      userID: useGetUserLoginData().user_id,
    });

  const handleSubmit = ({
    first_name,
    last_name,
    ...body
  }: ParticipantsGroupTableAPI) =>
    updateFunction({
      updateItem,
      id,
    })(body);

  return (
    <LoadingSpinner
      nameData="Participant"
      stateData={{ data, isLoading, isFetching, isError }}
    >
      {({ first_name, last_name, ...rest }) => (
        <ParticipantsGroupForm
          editMode={true}
          onSubmit={handleSubmit}
          defaultValues={rest}
        />
      )}
    </LoadingSpinner>
  );
}
