export const meetingsSelectStatement = `SELECT
res.*,
act.activity_name
from
(
  SELECT
    mt.*,
    json_agg(
      json_build_object(
        'participants_group_id',
        pgt.participants_group_id,
        'trainee_id',
        pgt.trainee_id,
        'first_name',
        pro.first_name,
        'last_name',
        pro.last_name
      )
    ) as "participants_group"
  FROM
    meetings AS mt
    LEFT JOIN participants_group AS pgt ON mt.meeting_id = pgt.meeting_id
    LEFT JOIN trainees AS tr ON tr.trainee_id = pgt.trainee_id
    LEFT JOIN profiles AS pro ON tr.profile_id = pro.profile_id
  group by
    mt.meeting_id
) AS res
LEFT JOIN activities AS act ON res.activity_id = act.activity_id`;
