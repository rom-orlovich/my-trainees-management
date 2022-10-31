/* eslint-disable camelcase */

import { RequestHandler } from "webpack-dev-server";
import { client } from "../../../PGSql/DBConnectConfig";
import { deleteQuery } from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { API_ROUTES } from "../../apiRoutesConstants";
import { logger } from "../../loggerService/logger";
import { createLogAlertInfo } from "../../serviceAlerts/handleAlerts";

// export const handleDeleteParticipantsGroup: RequestHandler = async (
//   req,
//   res,
//   next
// ) => {
//   if (req.logAlertInfo?.error) return next();

//   if (!req.excludedBody) return next();
//   const { participantGroup, user_id } = req.excludedBody;
//   const { meeting_id } = req.body as { meeting_id: number };

//   try {
//     await client.query("BEGIN");

//     const deleteAllParticipants = await deleteQuery(
//       TABLES_DATA.PARTICIPANTS_GROUP_ID,
//       `where ${TABLES_DATA.MEETINGS_ID}=$1`,
//       [meeting_id]
//     );

//     logger.debug("LINE 38: handleInsertParticipantsGroup error", {
//       fileName: __filename,
//       objs: [deleteAllParticipants],
//     });
//     await client.query("COMMIT");
//   } catch (error) {
//     logger.error("LINE 28: handleInsertParticipantsGroup error", {
//       fileName: __filename,
//       objs: [error],
//     });

//     await client.query("ROLLBACK");

//     req.logAlertInfo = createLogAlertInfo(API_ROUTES.PARTICIPANTS_GROUP_ENTITY)(
//       undefined,
//       error as Error,
//       "delete",
//       false
//     );
//   }

//   return next();
// };
