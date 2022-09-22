import React from "react";
import Card from "../../../components/baseComponents/Card/Card";
import TraineeEditForm from "../../../components/Forms/TraineeForms/TraineeEditForm";
import { TraineeTableAPI } from "../../../redux/api/interfaceAPI";
import { genClassName } from "../../../utilities/helpersFun";

import style from "./PersonalDetails.module.scss";
function PersonalDetails({
  traineeData,
  className,
}: {
  className?: string;
  traineeData: TraineeTableAPI;
}) {
  return (
    <Card className={style.card_container_personal_details}>
      <div className={genClassName(style.personal_details, className || "")}>
        <TraineeEditForm heading=" " traineeData={traineeData} />
      </div>
    </Card>
  );
}

export default PersonalDetails;
