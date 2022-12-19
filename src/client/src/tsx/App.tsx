import ModelController from "./components/baseComponents/Model/ModelController";

import useCheckRole from "./hooks/useCheckRole";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import TraineeLayout from "./layout/TraineeLayout/TraineeLayout";
import TrainerLayout from "./layout/TrainerLayout/TrainerLayout";
import HomePage from "./pages/HomePage/HomePage";

function App() {
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

export default App;
