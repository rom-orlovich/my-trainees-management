import React from "react";
import TraineeEditForm from "../../components/Forms/TraineeForms/TraineeEditForm";

import style from "./PersonalDetails.module.scss";
function PersonalDetails({ id }: { id: number }) {
  return (
    <TraineeEditForm
      // className={style}
      // heading="Personal Details"
      id={id}
    />
  );
}

export default PersonalDetails;
