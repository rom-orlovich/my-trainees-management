import { current } from "@reduxjs/toolkit";
import { useRef } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import ModelController from "./components/baseComponents/Model/ModelController";

import useCheckRole from "./hooks/useCheckRole";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import TraineeLayout from "./layout/TraineeLayout/TraineeLayout";
import TrainerLayout from "./layout/TrainerLayout/TrainerLayout";

import { User } from "./redux/api/interfaceAPI";
import { pathIsAuthRoute } from "./routes/utilities/PersistedLogin";

export interface UserRoles {
  isAdmin: boolean;
  isTrainee: boolean;
  isTrainer: boolean;
  userData: User;
}
function Dashboard() {
  const location = useLocation();
  const nav = useNavigate();

  // Basic layout of the app.
  const Layout = () => {
    const { isAdmin, isTrainer, isTrainee } = useCheckRole();

    if (isAdmin) return <AdminLayout />;
    if (isTrainer) return <TrainerLayout />;
    if (isTrainee) return <TraineeLayout />;
    // if (pathIsAuthRoute(location.pathname)) {
    //   // console.log("here");
    //   // <Navigate to={"/"} replace state={{ state: location }} />;
    // }
    return <></>;
  };

  return (
    <>
      <ModelController />
      <Layout />
    </>
  );
}

export default Dashboard;
