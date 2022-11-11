import React from "react";
import { MeetingAPI } from "../../../../redux/api/interfaceAPI";
import listProfileStyle from "../../ListProfile/ListProfile.module.scss";

function IncomeEventBoardLi({ note_topic, activity_name }: MeetingAPI) {
  return (
    <li className={listProfileStyle.list_li}>
      <span className={listProfileStyle.list_detail}>
        <span>Event</span>
        {note_topic || ""}
      </span>
      {/* <span className={listProfileStyle.list_detail}>
        <span></span>
        <span>{current_num_trainings}</span>
      </span>
      <span className={listProfileStyle.list_detail}>
        <span>Total</span>
        <span>{total_trainings}</span>
      </span>
      <span className={listProfileStyle.list_detail}>
        <span>Last</span>
        <span>{formatDate(last_training, 0)}</span>
      </span> */}
    </li>
  );
}

export default IncomeEventBoardLi;
