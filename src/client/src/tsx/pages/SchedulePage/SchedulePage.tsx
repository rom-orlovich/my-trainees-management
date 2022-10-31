import React from "react";
import FullCalendar, { EventInput } from "@fullcalendar/react"; // must go before plugins
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
  const dispatch = useAppDispatch();
  const [queryParmas, setQueryParams] = useSearchParams();

  const authState = useGetUserLoginData();
  const { data, isError, isFetching, isLoading } = meetingApi.useGetItemsQuery({
    user_id: authState,
  });
  const [deleteEvent] = meetingApi.useDeleteItemMutation();
  const events: EventInput[] | undefined = data?.data?.map((el) => ({
    id: String(el.meeting_id),
    title: el.note_topic,
    start: el.date_start,
    end: el.date_end,
  }));
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
          eventClick={(date) => {
            const eventB = date.el.querySelector('[class*="deleteIcon"]');
            if (eventB) deleteEvent(String(date.event.id));
            else {
              // setQueryParams({
              //   id: date.event.id,

              //   modelFormState: "edit",
              // });
              dispatch(changeModelState());
            }
          }}
          selectable={true}
          events={events}
          eventContent={(data) => (
            <div className={style.event_container}>
              <AiFillDelete
                onClick={() => deleteEvent(String(data.event.id))}
                className={style.deleteIcon}
              />
              <h3>{data.event.title} </h3>
            </div>
          )}
          longPressDelay={2} // This is the property you need to change
          select={(data) => {
            dispatch(changeModelState());
            setQueryParams({
              dateStart: String(data.start.getTime()),
              dateEnd: String(data.end.getTime()),
              modelFormState: "add",
            });
          }}
        />
      </section>
    </>
  );
}

export default SchedulePage;
