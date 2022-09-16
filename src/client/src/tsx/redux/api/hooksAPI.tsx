import {
  MusculesGroupTable,
  NotesTable,
  CitiesTable,
  ProvidersTable,
  WeeksTable,
  ExpensesTable,
  EquipmentsTable,
  ExercisesTable,
  NutritionProgramsListTable,
  NutritionProgramsTable,
  LocationsGetRes,
  TraineeGetRes,
  TraineeExtends,
  TrainingProgramExercise,
  API_ROUTES,
  SubscriptionPlans,
} from "../api/interfaceAPI";

import { apiCreateCRUDHooks } from "./apiCreateCRUDHooks";

import { LeadsFormProps } from "../../components/Forms/LeadForms/LeadForm";
import { TrainingProgramsListFormProps } from "../../components/Forms/TrainingProgramListForms/TrainingProgramListForm";

// Each on of the api object contains the CRUD hooks of the endpoint.
export const leadsApi = apiCreateCRUDHooks<LeadsFormProps>({
  reducerPath: "leadsApi",
  baseUrl: API_ROUTES.LEADS_ROUTE,
  singleEntityName: API_ROUTES.LEADS_ENTITY,
  listId: "leads_list",
});

export const musclesGroupApi = apiCreateCRUDHooks<MusculesGroupTable>({
  reducerPath: "musclesGroupApi",
  baseUrl: API_ROUTES.MUSCLES_GROUP_ROUTE,
  singleEntityName: API_ROUTES.MUSCLES_GROUP_ENTITY,
  listId: "musclesGroup_list",
});
export type ApiCRUD = typeof musclesGroupApi;
export const notesAPI = apiCreateCRUDHooks<NotesTable>({
  reducerPath: "notesAPI",
  baseUrl: API_ROUTES.NOTES_ROUTE,
  singleEntityName: API_ROUTES.NOTES_ENTITY,
  listId: "note_list",
});

export const citiesApi = apiCreateCRUDHooks<CitiesTable>({
  reducerPath: "citiesApi",
  baseUrl: API_ROUTES.CITIES_ROUTE,
  singleEntityName: API_ROUTES.CITIES_ENTITY,
  listId: "cities_list",
});
export const locationsApi = apiCreateCRUDHooks<LocationsGetRes>({
  reducerPath: "locationsApi",
  baseUrl: API_ROUTES.LOCATIONS_ROUTE,
  singleEntityName: API_ROUTES.LOCATIONS_ENTITY,
  listId: "locations_list",
});
export const providersApi = apiCreateCRUDHooks<ProvidersTable>({
  reducerPath: "providersApi",
  baseUrl: API_ROUTES.PROVIDERS_ROUTE,
  singleEntityName: API_ROUTES.PROVIDERS_ENTITY,
  listId: "providers_list",
});
export const weeksApi = apiCreateCRUDHooks<WeeksTable>({
  reducerPath: "weeksApi",
  baseUrl: API_ROUTES.WEEKS_ROUTE,
  singleEntityName: API_ROUTES.WEEKS_ENTITY,
  listId: "weeks_list",
});
export const expensesApi = apiCreateCRUDHooks<ExpensesTable>({
  reducerPath: "expensesApi",
  baseUrl: API_ROUTES.EXPENSES_ROUTE,
  singleEntityName: API_ROUTES.EXERCISES_ENTITY,
  listId: "expenses_list",
});
export const equipmentsApi = apiCreateCRUDHooks<EquipmentsTable>({
  reducerPath: "equipmentsApi",
  baseUrl: API_ROUTES.EQUIPMENTS_ROUTE,
  singleEntityName: API_ROUTES.EQUIPMENTS_ENTITY,
  listId: "equipments_list",
});
export const exercisesApi = apiCreateCRUDHooks<ExercisesTable>({
  reducerPath: "exercisesApi",
  baseUrl: API_ROUTES.EXERCISES_ROUTE,
  singleEntityName: API_ROUTES.EXERCISES_ENTITY,
  listId: "exercises_list",
});
export const trainingProgramsListApi =
  apiCreateCRUDHooks<TrainingProgramsListFormProps>({
    reducerPath: "trainingProgramsListApi",
    baseUrl: API_ROUTES.TRAINING_PROGRAMS_LIST_ROUTE,
    singleEntityName: API_ROUTES.TRAINING_PROGRAMS_LIST_ENTITY,
    listId: "training_programs_list",
  });
export const trainingProgramsApi = apiCreateCRUDHooks<TrainingProgramExercise>({
  reducerPath: "trainingProgramsApi",
  baseUrl: API_ROUTES.TRAINING_PROGRAMS_ROUTE,
  singleEntityName: API_ROUTES.TRAINING_PROGRAMS_ENTITY,
  listId: "training_programs_exercises_list",
});
export const nutritionProgramsListApi =
  apiCreateCRUDHooks<NutritionProgramsListTable>({
    reducerPath: "nutritionProgramsListApi",
    baseUrl: API_ROUTES.NUTRITION_PROGRAMS_LIST_ROUTE,
    singleEntityName: API_ROUTES.NUTRITION_PROGRAMS_LIST_ENTITY,
    listId: "nutrition_programs_list",
  });
export const nutritionProgramsApi = apiCreateCRUDHooks<NutritionProgramsTable>({
  reducerPath: "nutritionProgramsApi",
  baseUrl: API_ROUTES.NUTRITION_PROGRAMS_ROUTE,
  singleEntityName: API_ROUTES.NUTRITION_PROGRAMS_ENTITY,
  listId: "nutrition_programs_weeks_list",
});

export const traineesApi = apiCreateCRUDHooks<TraineeGetRes, TraineeExtends>({
  reducerPath: "traineesApi",
  baseUrl: API_ROUTES.TRAINEES_ROUTE,
  singleEntityName: API_ROUTES.TRAINEES_ENTITY,
  listId: "trainees_list",
});

export const subscriptionPlansApi = apiCreateCRUDHooks<SubscriptionPlans>({
  reducerPath: "membersPlansApi",
  baseUrl: API_ROUTES.SUBSCRIPTION_PLANS_ROUTE,
  singleEntityName: API_ROUTES.SUBSCRIPTION_PLANS_ENTITY,
  listId: "members_plans_list",
});

// export const incomesApi = apiCreateCRUDHooks<Incometable>({
//   reducerPath: "incomesApi",
//   baseUrl: API_ROUTES.INCOMES_ROUTE,
//   singleEntityName: API_ROUTES.INCOMES_ENTITY,
//   listId: "incomes_list",
// });

export const apiCreatCrudArr = [
  leadsApi,
  musclesGroupApi,
  notesAPI,
  citiesApi,
  locationsApi,
  providersApi,
  weeksApi,
  expensesApi,
  equipmentsApi,
  exercisesApi,
  trainingProgramsListApi,
  trainingProgramsApi,
  nutritionProgramsListApi,
  nutritionProgramsApi,
  traineesApi,

  subscriptionPlansApi,
  // incomesApi,
];

// Create Reducer arr that contains  object with key of the redcuer name and value the reducer function.
let reducersArr = {};
apiCreatCrudArr.forEach((value) => {
  reducersArr = { ...reducersArr, [value.reducerPath]: value.reducer };
});
export { reducersArr };

// Create middlewareArr from the apiCreateCrudArr.
export const middlewareArr = apiCreatCrudArr.map((el) => el.middleware);
