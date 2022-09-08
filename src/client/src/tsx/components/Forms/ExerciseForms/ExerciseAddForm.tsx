import React from "react";
import { exercisesApi } from "../../../redux/api/hooksAPI";
import { ExercisesTable } from "../../../redux/api/interfaceAPI";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";
import { ExerciseForm } from "./ExerciseForm";

export function ExerciseAddForm() {
  const [addItem, state] = exercisesApi.useCreateOneItemMutation();

  const handleSubmit = (body: ExercisesTable) => {
    addFunction({
      addItem,
    })(body);
  };

  return <ExerciseForm onSubmit={handleSubmit}></ExerciseForm>;
}
