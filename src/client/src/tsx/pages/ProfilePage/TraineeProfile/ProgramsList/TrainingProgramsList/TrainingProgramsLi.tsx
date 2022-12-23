/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";
import { TrainingProgramsListTableAPI } from "../../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../../routes/appRoutesConstants";
import { formatDate } from "../../../../../utilities/helpersFun";
// import style from "./Programs.module.scss";
import listProfileStyle from "../../../ListProfile/ListProfile.module.scss";

function TrainingProgramsLi({
  program_type,
  training_programs_list_id,
  date_start,
  date_end,
  trainee_id,
}: TrainingProgramsListTableAPI) {
  return (
    <li className={listProfileStyle.list_li}>
      <span className={listProfileStyle.list_detail}>
        <span>Program</span>
        <Link
          to={`/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/${training_programs_list_id}/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}?program=${program_type}&traineeID=${trainee_id}`}
        >
          {program_type}
        </Link>
      </span>
      <span className={listProfileStyle.list_detail}>
        <span>Date Start</span>
        <span>{formatDate(date_start)}</span>
      </span>
      <span className={listProfileStyle.list_detail}>
        <span>Date End</span>
        <span> {date_end ? formatDate(date_end) : "-"}</span>
      </span>
    </li>
  );
}

export default TrainingProgramsLi;
