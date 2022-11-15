/* eslint-disable camelcase */
import { formatDate } from "@fullcalendar/react";
import React from "react";
import { Link } from "react-router-dom";
import { MeetingAPI } from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import listProfileStyle from "../../ListProfile/ListProfile.module.scss";

function IncomeEventBoardLi({
  note_topic,
  date_start,
  date_end,
  activity_name,
  participants_groups_list_id,
  city_name,
  street,
  group_name,
  ...rest
}: MeetingAPI) {
  const dateStart = formatDate(date_start, { timeStyle: "short" });
  const dateEnd = formatDate(date_end, { timeStyle: "short" });
  return (
    <li className={listProfileStyle.list_li}>
      <span className={listProfileStyle.list_detail}>
        <span>Event</span>
        {note_topic || ""}
      </span>
      <span className={listProfileStyle.list_detail}>
        <span>Duration</span>
        <span>
          {dateStart}-{dateEnd}
        </span>
      </span>

      <span className={listProfileStyle.list_detail}>
        <span>Location</span>
        <span>
          {street}, {city_name}
        </span>
      </span>
      <span className={listProfileStyle.list_detail}>
        <span>Participants</span>
        <span>
          <Link
            to={`/${APP_ROUTE.SETTINGS_ROUTE}/${APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}/${participants_groups_list_id}/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}`}
          >
            {group_name}
          </Link>
        </span>
      </span>
    </li>
  );
}

export default IncomeEventBoardLi;
