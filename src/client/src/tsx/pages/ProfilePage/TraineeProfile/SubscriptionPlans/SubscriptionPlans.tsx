/* eslint-disable camelcase */

import Card from "../../../../components/baseComponents/Card/Card";

import { subscriptionPlansApi } from "../../../../redux/api/hooksAPI";

import { genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";

import style from "./SubscriptionPlan.module.scss";
import SubscriptionPlanLi from "./SubscriptionPlanLi";
import ListProfile from "../../ListProfile/ListProfile";

function SubscriptionPlans({ className, queryOptions }: TraineeProfileProps) {
  return (
    <Card
      className={genClassName(
        className,

        style.subscription_plans_container
      )}
    >
      <ListProfile
        dataNotFoundEl={<> No subscription plans were found</>}
        heading="Subscription Plans"
        useQuery={subscriptionPlansApi.useGetItemsQuery}
        queryOptions={{
          ...queryOptions,
          asc: "false",
          orderBy: "lastTraining",
        }}
        pagePath={""}
        LI={SubscriptionPlanLi}
      />
    </Card>
  );
}

export default SubscriptionPlans;
