/* eslint-disable camelcase */
import { RequestHandler } from "express";
import { client } from "../../../PGSql/DBConnectConfig";
import { insertQueryOneItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { OmitKey, PickKey } from "../../../utilities/types";
import { API_ROUTES } from "../../apiRoutesConstants";
import { logger } from "../../loggerService/logger";
import { createLogAlertInfo } from "../../serviceAlerts/handleAlerts";

export interface ParticipantsGroupTableAPI {
  participants_group_id?: number;
  meeting_id?: number;
  trainee_id: number;
  first_name?: string;
  last_name?: string;
  user_id?: number;
}

export interface MeetingAPI {
  meeting_id?: number;
  date_start: Date;
  date_end: Date;
  participants_group: ParticipantsGroupTableAPI[];
  activity_id: number;
  activity_name?: string;
  location_id: number;
  note_topic: string;
  note_text: string;
  user_id?: number;
}
export type MeetingTableAPI = OmitKey<MeetingAPI, "participants_group"> &
  PickKey<
    ParticipantsGroupTableAPI,
    "first_name" | "last_name" | "trainee_id" | "participants_group_id"
  >;

export const handleInsertParticipantsGroup: RequestHandler = async (
  req,
  res,
  next
) => {
  if (req.logAlertInfo?.error) return next();

  if (!req.insertParticipants) return next();
  const { participantGroup, user_id } = req.insertParticipants;
  const { meeting_id } = req.body as { meeting_id: number };

  try {
    await client.query("BEGIN");

    const promiseInsert = participantGroup.map((el) =>
      insertQueryOneItem(
        TABLES_DATA.PARTICIPANTS_GROUP_TABLE_NAME,
        {
          ...el,
          meeting_id,
          user_id,
        },
        `ON CONFLICT (${TABLES_DATA.PARTICIPANTS_GROUP_ID}) DO UPDATE SET 
        ${TABLES_DATA.TRAINEE_ID} = EXCLUDED.${TABLES_DATA.TRAINEE_ID},
          ${TABLES_DATA.MEETINGS_ID} = EXCLUDED.${TABLES_DATA.MEETINGS_ID},
        ${TABLES_DATA.USERS_TABLE_ID}= EXCLUDED.${TABLES_DATA.USERS_TABLE_ID}`
      )
    );

    const results = await Promise.all(promiseInsert);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");

    req.logAlertInfo = createLogAlertInfo(API_ROUTES.PARTICIPANTS_GROUP_ENTITY)(
      undefined,
      error as Error,
      "create",
      false
    );
  }

  return next();
};
