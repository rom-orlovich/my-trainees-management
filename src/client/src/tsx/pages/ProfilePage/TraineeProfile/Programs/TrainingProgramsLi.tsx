/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";
import { TrainingProgramsListTableAPI } from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { formatDate } from "../../../../utilities/helpersFun";
import style from "./Programs.module.scss";

function TrainingProgramsLi({
  type_program,
  training_programs_list_id,
  date_start,
  date_end,
}: TrainingProgramsListTableAPI) {
  return (
    <li>
      <span className={style.program_detail}>
        <span>Program</span>
        <Link
          to={`/${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/${training_programs_list_id}/${APP_ROUTE.TRAINING_PROGRAMS_EXERCISES_ROUTE}?program=${type_program}`}
        >
          {type_program}
        </Link>
      </span>
      <span className={style.program_detail}>
        <span>Date Start</span>
        <span>{formatDate(date_start)}</span>
      </span>
      <span className={style.program_detail}>
        <span>Date End</span>
        <span> {date_end ? formatDate(date_end) : "-"}</span>
      </span>
    </li>
  );
}

export default TrainingProgramsLi;
