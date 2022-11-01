/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-shadow */
import { RequestHandler } from "webpack-dev-server";
import { spreadObj } from "../../../PGSql/sqlHelpers";
import { OmitKey } from "../../../utilities/types";
import { logger } from "../../loggerService/logger";
import { MeetingAPI, MeetingTableAPI } from "./handleInsertParticipantsGroup";

const keys = ["first_name", "last_name", "trainee_id", "participants_group_id"];

const formatMeetingToHaveParticipantsGroupArr2 = (
  meetings: MeetingTableAPI[]
) => {
  let tempIndex = meetings[0]?.meeting_id;
  let meetingObj = {} as Record<string, any>;
  const meetingArr = [];

  const { excludedKeyValueObj, includeKeyValueObj } = spreadObj(
    meetings[0],
    keys
  );
  meetingObj = {
    ...excludedKeyValueObj,
    participants_group: [includeKeyValueObj],
  };

  meetingArr.push(meetingObj);
  for (let i = 1; i < meetings.length; i++) {
    const { excludedKeyValueObj, includeKeyValueObj } = spreadObj(
      meetings[i],
      keys
    );

    if (meetings[i].meeting_id === tempIndex)
      meetingObj.participants_group.push(includeKeyValueObj);
    else {
      meetingArr.push(meetingObj);
      meetingObj = {
        ...excludedKeyValueObj,
        participants_group: [includeKeyValueObj],
      };
      tempIndex = meetings[i].meeting_id;
    }
  }

  return meetingArr as MeetingAPI[];
};

export const formatMeetingToHaveParticipantsGroupArr = (
  meetings: MeetingTableAPI[]
) => {
  const participantArr = meetings.map(
    (el) => spreadObj(el, keys).includeKeyValueObj
  );

  const meetingObj = spreadObj(meetings[0], keys)
    .excludedKeyValueObj as OmitKey<MeetingAPI, "participants_group">;

  return { ...meetingObj, participants_group: participantArr };
};

export const handleGetMeetingsHaveGroupArr: RequestHandler = (
  req,
  res,
  next
) => {
  if (req.logAlertInfo?.error) return next();
  const body = req.body as {
    data: any[];
    next: boolean;
    countRows: number;
  };
  const MeetingTableArr = formatMeetingToHaveParticipantsGroupArr2(body.data);

  return res.status(200).json({ ...body, data: MeetingTableArr });
};

export const handleGetParticipantsGroup: RequestHandler = (req, res, next) => {
  if (req.logAlertInfo?.error) return next();
  const body = req.body as MeetingTableAPI[];
  const { participants_group, ...rest } =
    formatMeetingToHaveParticipantsGroupArr(body);

  logger.debug("LINE 21", { obj: participants_group, __filename });

  logger.debug("LINE 23", { obj: rest, __filename });
  return res.status(200).json({ ...rest, participants_group });
};
