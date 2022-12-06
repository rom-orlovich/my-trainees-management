/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";
import {
  NutritionMenuAPI,
  NutritionMenuTableApi,
  TrainingProgramsListTableAPI,
} from "../../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../../routes/appRoutesConstants";
import { formatDate } from "../../../../../utilities/helpersFun";
// import style from "./Programs.module.scss";
import listProfileStyle from "../../../ListProfile/ListProfile.module.scss";

function NutritionMenuLi({
  nutrition_menu_id,
  note_topic,
  profile_id,
  date_start,
  date_end,
}: NutritionMenuTableApi) {
  return (
    <li className={listProfileStyle.list_li}>
      <span className={listProfileStyle.list_detail}>
        <span>Program</span>
        <Link
          to={`/${APP_ROUTE.NUTRITION_MENUS_LIST_ROUTE}/${nutrition_menu_id}/${APP_ROUTE.NUTRITION_MENU_ROUTE}?profileID=${profile_id}`}
        >
          {note_topic}
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

export default NutritionMenuLi;
