/* eslint-disable camelcase */
import React from "react";
import LoadingSpinner from "../../../components/baseComponents/LoadingSpinner/LoadingSpinner";
import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";
import {
  locationsApi,
  meetingApi,
  participantsGroupApi,
} from "../../../redux/api/hooksAPI";
import { formatDate } from "../../../utilities/helpersFun";

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
        const { activity_name, date_end, date_start } = data;
        return (
          <div>
            <h1> {activity_name} </h1>
            <div className="dates">
              <span>
                Start: <b>{formatDate(date_start, 0, true)}</b>
              </span>
              <span>
                End: <b>{formatDate(date_end, 0, true)}</b>
              </span>
            </div>
            <div>
              <span>City: {data?.city_name}</span>
              <span>Address: {data?.street}</span>
            </div>
            <div>
              {participantsGroupData?.data.map((el) => (
                <span key={el.participants_groups_list_id}>
                  {el.first_name}
                </span>
              ))}
            </div>
          </div>
        );
      }}
    </LoadingSpinner>
  );
}

export default ModelMeetingDetails;
