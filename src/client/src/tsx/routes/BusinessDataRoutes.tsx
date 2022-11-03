import React from "react";
import { Route, Routes } from "react-router-dom";
import { ActivityAddForm } from "../components/Forms/ActivityForms/ActivityAddForm";
import { ActivityEditForm } from "../components/Forms/ActivityForms/ActivityEditForm";
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
import { ParticipantsGroupAddForm } from "../components/Forms/ParticipantsGroupForm/ParticipantsGroupAddForm";
import { ParticipantsGroupEditForm } from "../components/Forms/ParticipantsGroupForm/ParticipantsGroupEditForm";
import { ParticipantsGroupsListAddForm } from "../components/Forms/ParticipantsGroupsListForms/ParticipantsGroupsListAddForm";
import { ParticipantsGroupsListEditForm } from "../components/Forms/ParticipantsGroupsListForms/ParticipantsGroupsListEditForm.tsx";
import { ProductAddForm } from "../components/Forms/ProductsForms/ProductAddForm";
import ProductEditForm from "../components/Forms/ProductsForms/ProductEditForm";
import ActivitiesPage from "../pages/ActivitiesPage/ActivitiesPage";

import CitiesPage from "../pages/CitiesPage/CitiesPage";
import EquipmentsListPage from "../pages/EquipmentsListPage/EquipmentsListPage";
import ExercisesPage from "../pages/ExercisesPage/ExercisesPage";
import LocationsListPage from "../pages/LocationsPage/LocationsPage";
import MusclesGroupPage from "../pages/MusclesGroupPage/MusclesGroupPage";
import ParticipantsGroupPage from "../pages/ParticipantsGroupPage /ParticipantsGroupPage";
import ParticipantsGroupsListPage from "../pages/ParticipantsGroupsListPage/ParticipantsGroupsListPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import { APP_ROUTE } from "./appRoutesConstants";

const BusinessDataRoutes = () => (
  <Routes>
    <Route path={APP_ROUTE.EXERCISES_LIST_ROUTE} element={<ExercisesPage />}>
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

    <Route path={APP_ROUTE.PRODUCTS_ROUTE} element={<ProductsPage />}>
      <Route path={APP_ROUTE.PRODUCTS_ADD} element={<ProductAddForm />} />
      <Route path=":id" element={<ProductEditForm />} />
    </Route>

    <Route path={APP_ROUTE.ACTIVITIES_ROUTE} element={<ActivitiesPage />}>
      <Route
        path={APP_ROUTE.ACTIVITIES_ROUTE_ADD}
        element={<ActivityAddForm />}
      />
      <Route path=":id" element={<ActivityEditForm />} />
    </Route>

    <Route
      path={APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}
      element={<ParticipantsGroupsListPage />}
    >
      <Route
        path={APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE_ADD}
        element={<ParticipantsGroupsListAddForm />}
      />
      <Route path=":id" element={<ParticipantsGroupsListEditForm />} />
      <Route
        path={`:id/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}`}
        element={<ParticipantsGroupPage />}
      >
        <Route
          path={APP_ROUTE.PARTICIPANTS_GROUP_ROUTE_ADD}
          element={<ParticipantsGroupAddForm />}
        />
        <Route path=":id" element={<ParticipantsGroupEditForm />} />
      </Route>
    </Route>
  </Routes>
);
export default BusinessDataRoutes;
