/* eslint-disable @typescript-eslint/no-shadow */
import React from "react";
import FullCalendar, {
  DateEnv,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useSearchParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { genClassName } from "../../utilities/helpersFun";
import page from "../Page.module.scss";

import { changeModelState } from "../../redux/slices/apiSideEffectSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import ModelNewMeeting from "./ModelNewMeeting/ModelMeeting";

import style from "./SchedulePage.module.scss";
import { meetingApi } from "../../redux/api/hooksAPI";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner/LoadingSpinner";

function SchedulePage() {
  const authState = useGetUserLoginData();
  const dispatch = useAppDispatch();
  const [queryParmas, setQueryParams] = useSearchParams();
  const [deleteEvent] = meetingApi.useDeleteItemMutation();
  const { data } = meetingApi.useGetItemsQuery({
    user_id: authState,
  });

  const events: EventInput[] | undefined = data?.data?.map((el) => ({
    id: String(el.meeting_id),
    title: el.note_topic,
    start: el.date_start,
    end: el.date_end,
    // backgroundColor: el.activity_name?.includes("personal") ? "blue" : "red",
  }));

  const handleSelectEvent = (data: DateSelectArg) => {
    dispatch(changeModelState());
    setQueryParams({
      dateStart: String(data.start.getTime()),
      dateEnd: String(data.end.getTime()),
      modelFormState: "add",
    });
  };

  const handleEventClick = (date: EventClickArg) => {
    const target = date.jsEvent.target as HTMLElement;
    console.log(target);
    const deleteButton = target.closest(`[class*="deleteIcon"]`);
    if (deleteButton)
      // const eventB = date.el.closest(`[class*="SchedulePage_deleteIcon"]`);
      // console.log(date.el.tagName());
      deleteEvent(String(date.event.id));
    else {
      // else {
      setQueryParams({
        id: date.event.id,
        modelFormState: "edit",
      });
      dispatch(changeModelState());
    }
    // }
  };

  const handleEventContent = (data: EventContentArg) => (
    <div className={style.event_container}>
      <AiFillDelete
        onClick={() => {
          console.log("heys");
          deleteEvent(String(data.event.id));
        }}
        className={style.deleteIcon}
      />
      <h4>{data.event.title} </h4>
      {/* <h4>{data.even} </h4> */}
    </div>
  );
  return (
    <>
      <ModelNewMeeting />
      <section
        className={genClassName(page.page_container, style.schedule_page)}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          handleWindowResize={true}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventClick={handleEventClick}
          editable={true}
          selectable={true}
          events={events}
          eventContent={handleEventContent}
          longPressDelay={2} // This is the property you need to change
          select={handleSelectEvent}
          // stickyHeaderDates={true}
        />
      </section>
    </>
  );
}

export default SchedulePage;
