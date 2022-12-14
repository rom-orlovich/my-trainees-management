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

import { BsFillPlusSquareFill } from "react-icons/bs";
import { genClassName, addToDate } from "../../utilities/helpersFun";
import page from "../Page.module.scss";

import { useAppDispatch } from "../../redux/hooks";

import style from "./SchedulePage.module.scss";
import { meetingApi } from "../../redux/api/hooksAPI";

import { MeetingAPI } from "../../redux/api/interfaceAPI";
import useGetUserTraineeData from "../../hooks/useGetUserTraineeData";
import { openModel } from "../../redux/slices/modelControllerSlices/modelControllerSlice";

const isDesktopWidth = window.innerWidth > 500;

function SchedulePage() {
  const [pos, setPos] = useState<{ x: string; y: string } | null>(null);
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
    dateStart_gt: Date | string;
    dateStart_lt: Date | string;
  }>({ dateStart_gt: "", dateStart_lt: "" });

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

  const changeModelAction = openModel({ displayContent: "meeting" });
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
      dispatch(changeModelAction);
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
      dispatch(changeModelAction);
    }
  };

  const handleDropEvent = (event: EventDropArg) => {
    if (isTrainee) return;
    const lastEventData = data?.data.find(
      (el) => el?.meeting_id === Number(event.oldEvent.id)
    );
    if (lastEventData) {
      const { activity_name, city_name, street, ...rest } = lastEventData;

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
      const { activity_name, city_name, street, ...rest } = lastEventData;

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
      dateStart_gt: DatesSetArg.startStr,
      dateStart_lt: DatesSetArg.endStr,
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
        {!isTrainee && (
          <div
            style={{ top: pos?.y || "", left: pos?.x || "" }}
            className={style.float_add_meeting_button}
            onClick={() => {
              dispatch(changeModelAction);
              setQueryParams({
                dateStart: String(
                  addToDate(new Date(), { dPlus: 0, minPlus: 0 }).getTime()
                ),
                dateEnd: "",
                modelFormState: "add",
              });
            }}
            draggable={true}
          >
            <BsFillPlusSquareFill />
          </div>
        )}
      </section>
    </>
  );
}

export default SchedulePage;
