import React from "react";
import TraineeEditForm from "../../components/Forms/TraineeForms/TraineeEditForm";
import { TraineeTableAPI } from "../../redux/api/interfaceAPI";

import style from "./PersonalDetails.module.scss";
function PersonalDetails({ traineeData }: { traineeData: TraineeTableAPI }) {
  return <TraineeEditForm traineeData={traineeData} />;
}

export default PersonalDetails;
