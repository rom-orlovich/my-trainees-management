/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import { format } from "date-fns";

import { Link } from "react-router-dom";
import { MeetingAPI } from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import listProfileStyle from "../../ListProfile/ListProfile.module.scss";

function IncomeEventBoardLi({
  note_topic,
  date_start,
  date_end,
  participants_groups_list_id,
  city_name,
  street,
  group_name,
}: MeetingAPI) {
  const dateStart = new Date(date_start);
  const dateEnd = new Date(date_end);
  const dateStartStr = format(dateStart, "dd/MM/yy");
  let dateDisplayStr;
  if (dateStart.getDate() === dateEnd.getDate()) {
    dateDisplayStr = dateStartStr;
  } else {
    dateDisplayStr = `${dateStartStr}-${format(dateEnd, "dd/MM/yy")}`;
  }
  const hourStart = format(dateStart, "HH:mma");
  const hourEnd = format(dateEnd, "HH:mma");

  return (
    <li className={listProfileStyle.list_li}>
      <span className={listProfileStyle.list_detail}>
        <span>Event</span>
        {note_topic || ""}
      </span>
      <span className={listProfileStyle.list_detail}>
        <span>{dateDisplayStr}</span>
        <span>
          {hourStart}-{hourEnd}
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
