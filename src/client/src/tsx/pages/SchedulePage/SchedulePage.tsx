/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-shadow */
import React from "react";
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
  EventInput,
} from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";

import { useSearchParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { genClassName } from "../../utilities/helpersFun";
import page from "../Page.module.scss";

import { changeModelState } from "../../redux/slices/apiSideEffectSlice";
import { useAppDispatch } from "../../redux/hooks";

import ModelNewMeeting from "./ModelNewMeeting/ModelMeeting";

import style from "./SchedulePage.module.scss";
import { meetingApi } from "../../redux/api/hooksAPI";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import { MeetingAPI } from "../../redux/api/interfaceAPI";

function SchedulePage() {
  const authState = useGetUserLoginData();
  const dispatch = useAppDispatch();
  const [queryParmas, setQueryParams] = useSearchParams();
  const [deleteEvent] = meetingApi.useDeleteItemMutation();
  const [updateEvent] = meetingApi.useUpdateItemMutation({
    fixedCacheKey: "sd",
  });
  const { data } = meetingApi.useGetItemsQuery({
    userID: authState.user_id,
  });

  const events: EventInput[] | undefined = data?.data?.map((el) => ({
    id: String(el.meeting_id),
    title: el.note_topic,
    start: el.date_start,
    end: el.date_end,
  }));
  const handleEventContent = (event: EventContentArg) => (
    // <div className={style.event_container}>
    //   <AiFillDelete
    //     onClick={() => {
    //       deleteEvent(String(event.event.id));
    //     }}
    //     className={style.deleteIcon}
    //   />
    //   <h4>
    //     <span>{event.timeText}</span> {event.event.title}
    //   </h4>
    // </div>
    <div className={style.event_container}>
      <AiFillDelete className={style.deleteIcon} />
      <b>{event.timeText}</b>
      <i>{event.event.title}</i>
    </div>
  );
  const handleSelectEvent = (event: DateSelectArg) => {
    dispatch(changeModelState());
    setQueryParams({
      dateStart: String(event.start.getTime()),
      dateEnd: String(event.end.getTime()),
      modelFormState: "add",
    });
  };

  const handleEventClick = (event: EventClickArg) => {
    const target = event.jsEvent.target as HTMLElement;
    const deleteButton = target.closest(`[class*="deleteIcon"]`);
    if (deleteButton) deleteEvent(String(event.event.id));
    else {
      // else {
      setQueryParams({
        id: event.event.id,
        modelFormState: "edit",
      });
      dispatch(changeModelState());
    }
  };

  const handleDropEvent = (event: EventDropArg) => {
    const lastEventData = data?.data.find(
      (el) => el?.meeting_id === Number(event.oldEvent.id)
    );
    if (lastEventData) {
      const { activity_name, ...rest } = lastEventData;

      updateEvent({
        payload: {
          ...rest,
          date_start: event.event.start,
          date_end: event.event.end,
        } as MeetingAPI,
        id: Number(event.oldEvent.id),
      });
    }
  };
  const handleResizeEvent = (event: EventResizeDoneArg) => {
    const lastEventData = data?.data.find(
      (el) => el?.meeting_id === Number(event.oldEvent.id)
    );
    if (lastEventData) {
      const { activity_name, ...rest } = lastEventData;

      updateEvent({
        payload: {
          ...rest,
          date_start: event.event.start,
          date_end: event.event.end,
        } as MeetingAPI,
        id: Number(event.oldEvent.id),
      });
    }
  };
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
          eventDrop={handleDropEvent}
          eventResize={handleResizeEvent}
          editable={true}
          selectable={true}
          eventOverlap={false}
          events={events}
          eventContent={handleEventContent}
          longPressDelay={2} // This is the property you need to change
          select={handleSelectEvent}
        />
      </section>
    </>
  );
}

export default SchedulePage;
