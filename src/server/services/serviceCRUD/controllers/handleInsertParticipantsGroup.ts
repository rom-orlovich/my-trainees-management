/* eslint-disable camelcase */
import { RequestHandler } from "express";
import { client } from "../../../PGSql/DBConnectConfig";
import { insertQueryOneItem } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { API_ROUTES } from "../../apiRoutesConstants";
import { logger } from "../../loggerService/logger";
import { createLogAlertInfo } from "../../serviceAlerts/handleAlerts";

export interface ParticipantsGroupTableAPI {
  participants_group_id?: number;
  meeting_id?: number;
  trainee_id: number;
  user_id?: number;
}

export interface MeetingsTableAPI {
  meeting_id?: number;
  date_start: Date;
  date_end: Date;
  participants_group: ParticipantsGroupTableAPI[];
  activity_id: number;
  location_id: number;
  note_topic: string;
  note_text: string;
  user_id?: number;
}

export const handleInsertParticipantsGroup: RequestHandler = async (
  req,
  res,
  next
) => {
  if (req.logAlertInfo?.error) return next();

  if (!req.excludedBody) return next();
  const { participantGroup, user_id } = req.excludedBody;
  const { meeting_id } = req.body as { meeting_id: number };

  try {
    await client.query("BEGIN");

    const promiseInsert = participantGroup.map((el) =>
      insertQueryOneItem(
        TABLES_DATA.PARTICIPANTS_GROUP_TABLE_NAME,
        {
          user_id,
          meeting_id,
          ...el,
        },
        `ON CONFLICT (${TABLES_DATA.PARTICIPANTS_GROUP_ID}) DO UPDATE SET 
        ${TABLES_DATA.TRAINEE_ID} = EXCLUDED.${TABLES_DATA.TRAINEE_ID},
          ${TABLES_DATA.MEETINGS_ID} = EXCLUDED.${TABLES_DATA.TRAINEE_ID},
        ${TABLES_DATA.USERS_TABLE_ID}= EXCLUDED.${TABLES_DATA.USERS_TABLE_ID}`
      )
    );

    const results = await Promise.all(promiseInsert);
    logger.debug("LINE 38: handleInsertParticipantsGroup error", {
      fileName: __filename,
      objs: [results],
    });
    await client.query("COMMIT");
  } catch (error) {
    logger.error("LINE 28: handleInsertParticipantsGroup error", {
      fileName: __filename,
      objs: [error],
    });

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
