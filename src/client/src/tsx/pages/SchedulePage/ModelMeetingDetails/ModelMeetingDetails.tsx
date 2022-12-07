/* eslint-disable camelcase */
import { formatDate, FormatDateOptions } from "@fullcalendar/react";
import React from "react";
import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";
import { meetingApi, participantsGroupApi } from "../../../redux/api/hooksAPI";
import { capitalFirstLetter } from "../../../utilities/helpersFun";
import style from "./ModelMeetingDetails.module.scss";

function ModelMeetingDetails({ meetingID }: { meetingID: number }) {
  const { isTrainee, traineeID, userID, trainerUserID } =
    useGetUserTraineeData();

  const queryOptions = isTrainee
    ? { traineeID, trainerUserID, userID }
    : { userID };

  const {
    data: meetingData,
    isError,
    isFetching,
    isLoading,
  } = meetingApi.useGetItemByIDQuery({
    id: meetingID,
    ...queryOptions,
  });

  const { data: participantsGroupData, isLoading: participantsGroupIsLoading } =
    participantsGroupApi.useGetItemsQuery({
      ...queryOptions,
      participantsGroupsListID: meetingData?.participants_groups_list_id,
    });

  const dateFormat: FormatDateOptions | undefined = {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
  };
  const lengthParticipants = participantsGroupData?.data.length;
  return (
    <LoadingSpinner
      stateData={{
        data: meetingData,
        isError,
        isFetching,
        isLoading: isLoading && participantsGroupIsLoading,
      }}
    >
      {(data) => {
        const { activity_name, date_end, date_start, street, city_name } = data;
        return (
          <div className={style.meeting_details_container}>
            <h1>
              {activity_name?.split(" ").map(capitalFirstLetter).join(" ")}
            </h1>
            <div className={style.meeting_details_content}>
              <span>
                Start: <b>{formatDate(date_start, dateFormat)}</b>
              </span>
              <span>
                End: <b>{formatDate(date_end, dateFormat)}</b>
              </span>

              <span>
                {`Location: `}
                <b>
                  {street}, {city_name}
                </b>
              </span>

              <span>
                {`Participants: `}
                {participantsGroupData?.data.map((el, i) => {
                  const delimiter =
                    lengthParticipants && i < lengthParticipants - 1 ? "," : "";
                  return (
                    <b key={el.participants_group_id}>
                      {`${el.first_name} ${el.last_name}${delimiter} `}
                    </b>
                  );
                })}
              </span>
              <button className={style.button_submit}>Submit</button>
            </div>
          </div>
        );
      }}
    </LoadingSpinner>
  );
}

export default ModelMeetingDetails;
