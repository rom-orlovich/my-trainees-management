import React from "react";
import { Route, Routes } from "react-router-dom";
import SubscriptionPlansAddForm from "../components/Forms/SubscriptionPlansForms/SubscriptionPlansAddForm";
import SubscriptionPlansEditForm from "../components/Forms/SubscriptionPlansForms/SubscriptionPlansEditForm";
import TraineeAddForm from "../components/Forms/TraineeForms/TraineeAddForm";
import TraineeEditForm from "../components/Forms/TraineeForms/TraineeEditForm";
import TraineeProfile from "../pages/ProfilePage/TraineeProfile/TraineeProfile";
import TraineesPage from "../pages/TraineesPage/TraineesPage";
import { APP_ROUTE } from "./appRoutesConstants";
import InsteadOutletRoutes from "./utilities/InsteadOutletRoutes";

const TraineesRoutes = () => (
  <Routes>
    <Route
      path=""
      element={
        <InsteadOutletRoutes
          InsteadOutletRoutesPaths={APP_ROUTE.TRAINEES_ROUTE}
        >
          <TraineesPage />
        </InsteadOutletRoutes>
      }
    >
      <Route path=":id">
        <Route index element={<TraineeEditForm />} />

        <Route path={APP_ROUTE.PROFILE_ROUTE} element={<TraineeProfile />} />
        <Route path={APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE}>
          <Route
            path={APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE_ADD}
            element={<SubscriptionPlansAddForm />}
          />
          <Route path={APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE_EDIT}>
            <Route path=":id" element={<SubscriptionPlansEditForm />} />
          </Route>
        </Route>
      </Route>

      <Route path={APP_ROUTE.TRAINEES_ROUTE_ADD} element={<TraineeAddForm />} />
    </Route>
  </Routes>
);

export default TraineesRoutes;
