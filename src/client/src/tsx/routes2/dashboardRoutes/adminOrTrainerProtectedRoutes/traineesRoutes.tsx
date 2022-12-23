import { RouteObject } from "react-router-dom";
import TraineeAddForm from "../../../components/Forms/TraineeForms/TraineeAddForm";
import TraineeEditForm from "../../../components/Forms/TraineeForms/TraineeEditForm";
import TraineeProfile from "../../../pages/ProfilePage/TraineeProfile/TraineeProfile";
import TraineesPage from "../../../pages/TraineesPage/TraineesPage";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

export const nutritionMenuByIDRoutes: RouteObject = {
  path: ":nutritionMenuID",
  children: [],
};

export const traineesRoutes: RouteObject = {
  path: APP_ROUTE.TRAINEES_ROUTE,
  element: <TraineesPage />,
  children: [
    { path: APP_ROUTE.TRAINEES_ROUTE_ADD, element: <TraineeAddForm /> },
    {
      path: ":traineeID",
      children: [
        {
          path: "",
          element: <TraineeEditForm />,
        },
        {
          path: APP_ROUTE.PROFILE_ROUTE,
          element: <TraineeProfile />,
        },
        {
          path: APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE,
        },
      ],
    },
  ],
};
