import { current } from "@reduxjs/toolkit";
import { useRef } from "react";
import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import ModelController from "./components/baseComponents/Model/ModelController";

import useCheckRole from "./hooks/useCheckRole";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import TraineeLayout from "./layout/TraineeLayout/TraineeLayout";
import TrainerLayout from "./layout/TrainerLayout/TrainerLayout";
import LoginPage from "./pages/AuthPages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import { User } from "./redux/api/interfaceAPI";
import PersistedLogin from "./routes/utilities/PersistedLogin";

export interface UserRoles {
  isAdmin: boolean;
  isTrainee: boolean;
  isTrainer: boolean;
  userData: User;
}
function Dashboard() {
  const location = useLocation();
  // Basic layout of the app.
  const Layout = () => {
    const { isAdmin, isTrainer, isTrainee } = useCheckRole();

    if (isAdmin) return <AdminLayout />;
    if (isTrainer) return <TrainerLayout />;
    if (isTrainee) return <TraineeLayout />;
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
