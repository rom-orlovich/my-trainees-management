import React from "react";
import { participantsGroupApi } from "../../../redux/api/hooksAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ParticipantsGroupForm } from "./ParticipantsGroupForm";

export function ParticipantsGroupAddForm() {
  const [addItem, state] = participantsGroupApi.useCreateOneItemMutation();

  const handleSubmit = addFunction({
    addItem,
  });

  return <ParticipantsGroupForm onSubmit={handleSubmit} />;
}
