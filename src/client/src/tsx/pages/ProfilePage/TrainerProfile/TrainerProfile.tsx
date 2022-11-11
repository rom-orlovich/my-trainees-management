import React from "react";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import UserDetails from "../UserDetails/UserDetails";
import FinancesStatus from "./FinancesStatus/FinanceStatus";

import IncomeEventsBoard from "./IncomeEventsBoard/IncomeEventsBoard";
import LeadsStatus from "./LeadsStatus/LeadsStatus";
import TraineeStatus from "./TraineeStatus/TraineeStatus";
import style from "./TrainerProfile.module.scss";

export interface TrainerProfileProps {
  queryOptions: { userID?: number };
}
function TrainerProfile() {
  const { user_id, authState } = useGetUserLoginData();

  const queryOptions = { userID: user_id };
  return (
    <section className={style.trainer_profile_page}>
      <div className={style.trainer_profile_page_container}>
        <IncomeEventsBoard
          queryOptions={queryOptions}
          className={style.income_events_board_grid_item}
        />
        <UserDetails className={style.user_details_grid_item} />
        <FinancesStatus className={style.finances_status_grid_item} />
        <TraineeStatus className={style.trainees_status_grid_item} />
        <LeadsStatus className={style.leads_status_grid_item} />
      </div>
    </section>
  );
}

export default TrainerProfile;
