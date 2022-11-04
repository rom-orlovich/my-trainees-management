/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from "react";
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

const isDesktopWidth = window.innerWidth > 500;

function SchedulePage() {
  const authState = useGetUserLoginData();
  const dispatch = useAppDispatch();
  const [queryParams, setQueryParams] = useSearchParams();
  const [deleteEvent] = meetingApi.useDeleteItemMutation();
  const [updateEvent] = meetingApi.useUpdateItemMutation();
  const [dateRange, setDateRange] = useState<{
    gt: Date | string;
    lt: Date | string;
  }>({ gt: "", lt: "" });
  const { data } = meetingApi.useGetItemsQuery({
    userID: authState.user_id,
    ...dateRange,
    numResults: 100,
  });

  const events: EventInput[] | undefined = data?.data?.map((el) => ({
    id: String(el.meeting_id),
    title: el.note_topic,
    start: el.date_start,
    end: el.date_end,
  }));
  const handleEventContent = (event: EventContentArg) => (
    <div className={style.event_container}>
      <AiFillDelete className={style.deleteIcon} />
      <div className={style.date_data}>
        <b>{event.timeText}</b>
        <i>{event.event.title}</i>
      </div>
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
          initialView={isDesktopWidth ? "dayGridMonth" : "timeGridDay"}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridDay",
          }}
          allDaySlot={false}
          eventClick={handleEventClick}
          eventDrop={handleDropEvent}
          eventResize={handleResizeEvent}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          editable={true}
          selectable={true}
          // slotEventOverlap={true}
          eventOverlap={true}
          // selectOverlap={true}

          // slotEventOverlap={false}
          // datesSet={(DatesSetArg) => {
          //   console.log(DatesSetArg);
          //   setDateRange({
          //     gt: DatesSetArg.start.toISOString(),
          //     lt: DatesSetArg.end.toISOString(),
          //   });
          // }}
          events={events}
          eventContent={handleEventContent}
          longPressDelay={500} // This is the property you need to change
          select={handleSelectEvent}
          // visibleRange={(currentDate) => {
          //   const startDate = new Date(currentDate.valueOf());
          //   const endDate = new Date(currentDate.valueOf());

          //   // Adjust the start & end dates, respectively
          //   startDate.setDate(startDate.getDate() - 1); // One day in the past
          //   endDate.setDate(endDate.getMonth() + 2); // Two days into the future
          //   return { start: startDate, end: endDate };
          // }}
        />
      </section>
    </>
  );
}

export default SchedulePage;
