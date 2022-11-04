/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from "react";
import FullCalendar, {
  DateFormatter,
  DateSelectArg,
  DatesSetArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
  EventInput,
  FormatterInput,
} from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  DateClickArg,
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
import useGetUserTraineeData from "../../hooks/useGetUserTraineeData";

const isDesktopWidth = window.innerWidth > 500;

function SchedulePage() {
  const dispatch = useAppDispatch();
  const [queryParams, setQueryParams] = useSearchParams();
  const [deleteEvent] = meetingApi.useDeleteItemMutation();
  const [updateEvent] = meetingApi.useUpdateItemMutation();

  const { isTrainee, traineeID, userID, trainerUserID } =
    useGetUserTraineeData();

  const queryOptions = isTrainee
    ? { traineeID, trainerUserID, userID }
    : { userID };

  const [dateRange, setDateRange] = useState<{
    gt: Date | string;
    lt: Date | string;
  }>({ gt: "", lt: "" });

  const { data } = meetingApi.useGetItemsQuery({
    ...queryOptions,
    ...dateRange,
    numResults: 100,
  });
  const formatTimeObj: FormatterInput | DateFormatter | undefined = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const events: EventInput[] | undefined = data?.data?.map((el) => ({
    id: String(el.meeting_id),
    title: el.note_topic,
    start: el.date_start,
    end: el.date_end,
  }));
  const handleEventContent = (event: EventContentArg) => (
    <div className={style.event_container}>
      {!isTrainee && <AiFillDelete className={style.deleteIcon} />}
      <div className={style.date_data}>
        <b>{event.timeText}</b>
        <i>{event.event.title}</i>
      </div>
    </div>
  );
  const handleSelectEvent = (event: DateSelectArg) => {
    if (isTrainee) return;
    if (event.view.type === "timeGridDay") {
      dispatch(changeModelState());
      setQueryParams({
        dateStart: String(event.start.getTime()),
        dateEnd: String(event.end.getTime()),
        modelFormState: "add",
      });
    }
  };

  const handleEventClick = (event: EventClickArg) => {
    const target = event.jsEvent.target as HTMLElement;
    const deleteButton = target.closest(`[class*="deleteIcon"]`);
    if (deleteButton) deleteEvent(String(event.event.id));
    else {
      setQueryParams({
        meetingID: event.event.id,
        modelFormState: "edit",
      });
      dispatch(changeModelState());
    }
  };

  const handleDropEvent = (event: EventDropArg) => {
    if (isTrainee) return;
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
    if (isTrainee) return;
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

  const handleDateset = (DatesSetArg: DatesSetArg) => {
    setDateRange({
      gt: DatesSetArg.startStr,
      lt: DatesSetArg.endStr,
    });
  };
  const handleDateClick = (date: DateClickArg) => {
    if (date.view.type !== "timeGridDay") {
      date.view.calendar.gotoDate(date.date);
      date.view.calendar.changeView("timeGridDay");
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
          initialView={isDesktopWidth ? "dayGridMonth" : "timeGridDay"}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridDay",
          }}
          events={events}
          datesSet={handleDateset}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleDropEvent}
          eventResize={handleResizeEvent}
          eventContent={handleEventContent}
          select={handleSelectEvent}
          eventTimeFormat={formatTimeObj}
          slotLabelFormat={formatTimeObj}
          allDaySlot={false}
          editable={!isTrainee}
          selectable={!isTrainee}
          eventOverlap={true}
          handleWindowResize={true}
          longPressDelay={500}
        />
      </section>
    </>
  );
}

export default SchedulePage;
