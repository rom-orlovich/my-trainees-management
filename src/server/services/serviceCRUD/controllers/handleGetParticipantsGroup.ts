import { RequestHandler } from "webpack-dev-server";
import { spreadObj } from "../../../PGSql/sqlHelpers";
import { MeetingsTableAPI } from "./handleInsertParticipantsGroup";

export const handleGetParticipantsGroup: RequestHandler = (req, res, next) => {
  if (req.logAlertInfo?.error) return next();

  const body = req.body as MeetingsTableAPI[];

  const keys = [
    "first_name",
    "last_name",
    "trainee_id",
    "participants_group_id",
    // "meeting_id",
    // "user_id",
  ];
  const participantArr = body.map(
    (el) => spreadObj(el, keys).includeKeyValueObj
  );
  const meeting = spreadObj(body[0], keys).excludedKeyValueObj;

  return res
    .status(200)
    .json({ ...meeting, participants_group: participantArr });
};
