import { Navigate, useLocation } from "react-router-dom";
import ModelController from "./components/baseComponents/Model/ModelController";

import useCheckRole from "./hooks/useCheckRole";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import TraineeLayout from "./layout/TraineeLayout/TraineeLayout";
import TrainerLayout from "./layout/TrainerLayout/TrainerLayout";
import HomePage from "./pages/HomePage/HomePage";
import { APP_ROUTE } from "./routes/appRoutesConstants";

function App() {
  const location = useLocation();
  // Basic layout of the app.
  const Layout = () => {
    const { isAdmin, isTrainer, isTrainee } = useCheckRole();
    if (isAdmin) return <AdminLayout />;
    if (isTrainer) return <TrainerLayout />;
    if (isTrainee) return <TraineeLayout />;
    return <HomePage />;
  };

  return (
    <>
      <ModelController />
      <Layout />
    </>
  );
}

export default App;
