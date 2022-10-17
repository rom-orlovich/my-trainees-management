import React from "react";
import { Route, Routes } from "react-router-dom";
import { CityAddForm } from "../components/Forms/CityForms/CityAddForm";
import { CityEditForm } from "../components/Forms/CityForms/CityEditForm";
import { EquipmentAddForm } from "../components/Forms/EquipmentForms/EquipmentAddForm";
import { EquipmentEditForm } from "../components/Forms/EquipmentForms/EquipmentEditForm";
import { ExerciseAddForm } from "../components/Forms/ExerciseForms/ExerciseAddForm";
import { ExerciseEditForm } from "../components/Forms/ExerciseForms/ExerciseEditForm";
import { LocationAddForm } from "../components/Forms/LocationForms/LocationAddForm";
import { LocationEditForm } from "../components/Forms/LocationForms/LocationEditForm";
import { MusclesGroupAddForm } from "../components/Forms/MusclesGroupForms/MusclesGroupAddForm";
import { MusclesGroupEditForm } from "../components/Forms/MusclesGroupForms/MusclesGroupEditForm";
import useCheckRole from "../hooks/useCheckRole";
import CitiesPage from "../pages/CitiesPage/CitiesPage";
import EquipmentsListPage from "../pages/EquipmentsListPage/EquipmentsListPage";
import ExercisesPage from "../pages/ExercisesPage/ExercisesPage";
import LocationsListPage from "../pages/LocationsPage/LocationsPage";
import MusclesGroupPage from "../pages/MusclesGroupPage/MusclesGroupPage";
import { APP_ROUTE } from "./appRoutesConstants";
import ProtectedRoute from "./utilities/ProtectedRoute";

const BusinessDataRoutes = () => {
  const { isAdmin, isTrainee, isTrainer } = useCheckRole();
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRole={isTrainer || isAdmin} />}>
        <Route
          path={APP_ROUTE.EXERCISES_LIST_ROUTE}
          element={<ExercisesPage />}
        >
          <Route
            path={APP_ROUTE.EXERCISE_ADD}
            element={<ExerciseAddForm />}
          ></Route>
          <Route path=":id" element={<ExerciseEditForm />}></Route>
        </Route>
        <Route
          path={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}
          element={<EquipmentsListPage />}
        >
          <Route
            path={APP_ROUTE.EQUIPMENT_ADD}
            element={<EquipmentAddForm />}
          ></Route>
          <Route path=":id" element={<EquipmentEditForm />}></Route>
        </Route>
        <Route
          path={APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}
          element={<MusclesGroupPage />}
        >
          <Route
            path={APP_ROUTE.MUSCLES_GROUP_ADD}
            element={<MusclesGroupAddForm />}
          />
          <Route path=":id" element={<MusclesGroupEditForm />}></Route>
        </Route>
        <Route path={APP_ROUTE.LOCATION_ROUTE} element={<LocationsListPage />}>
          <Route
            path={APP_ROUTE.LOCATION_ROUTE_ADD}
            element={<LocationAddForm />}
          />
          <Route path=":id" element={<LocationEditForm />} />
        </Route>
        <Route path={APP_ROUTE.CITY_ROUTE} element={<CitiesPage />}>
          <Route path={APP_ROUTE.CITY_ROUTE_ADD} element={<CityAddForm />} />
          <Route path=":id" element={<CityEditForm />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default BusinessDataRoutes;
