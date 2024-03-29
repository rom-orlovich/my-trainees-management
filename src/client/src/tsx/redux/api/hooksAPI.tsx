import { CreateApi, createApi } from "@reduxjs/toolkit/dist/query/react";
import { combineReducers, Reducer } from "@reduxjs/toolkit";
import {
  MusclesGroupTableAPI,
  CitiesTableAPI,
  ProvidersTableAPI,
  WeeksTableAPI,
  ExpensesTableAPI,
  EquipmentsTableAPI,
  ExercisesTableAPI,
  LocationsGetRes,
  TraineesTableExtendsAPI,
  TrainingProgramExerciseTableAPI,
  SubscriptionPlansAPI,
  LeadsTableAPI,
  TrainingProgramsListTableAPI,
  AlertsAPI,
  ExerciseStatsAPI,
  ResponseQueryAPI,
  MeasuresCalResAPI,
  User,
  ChartsDataAPI,
  IncomesTableAPI,
  ProductAPI,
  ActivitiesTableAPI,
  MeetingAPI,
  ParticipantsGroupTableAPI,
  ParticipantsGroupsListTableAPI,
  FinanceAPI,
  NutritionMenuTableApi,
  NutritionMenuAPI,
  FoodAPI,
  NutritionQuestionnaire,
} from "./interfaceAPI";

import { apiCreateCRUDHooks } from "./apiCreateCRUDHooks";
import { providerTags } from "../reduxHelpers";
import { baseQueryWithReauth } from "./apiReauthQuery";
import { GenericRecord } from "../../types";
import { API_ROUTES } from "./apiRoutes";

export const usersApi = apiCreateCRUDHooks<User>({
  reducerPath: "usersApi",
  baseUrl: API_ROUTES.USERS_ROUTE,
  singleEntityName: API_ROUTES.USER_ENTITY,
  listId: "users_list",
});

// Each on of the api object contains the CRUD hooks of the endpoint.
export const leadsApi = apiCreateCRUDHooks<LeadsTableAPI>({
  reducerPath: "leadsApi",
  baseUrl: API_ROUTES.LEADS_ROUTE,
  singleEntityName: API_ROUTES.LEADS_ENTITY,
  listId: "leads_list",
});

export const musclesGroupApi = apiCreateCRUDHooks<MusclesGroupTableAPI>({
  reducerPath: "musclesGroupApi",
  baseUrl: API_ROUTES.MUSCLES_GROUP_ROUTE,
  singleEntityName: API_ROUTES.MUSCLES_GROUP_ENTITY,
  listId: "musclesGroup_list",
});
export type ApiCRUD = typeof musclesGroupApi;

export const citiesApi = apiCreateCRUDHooks<CitiesTableAPI>({
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
export const providersApi = apiCreateCRUDHooks<ProvidersTableAPI>({
  reducerPath: "providersApi",
  baseUrl: API_ROUTES.PROVIDERS_ROUTE,
  singleEntityName: API_ROUTES.PROVIDERS_ENTITY,
  listId: "providers_list",
});
export const weeksApi = apiCreateCRUDHooks<WeeksTableAPI>({
  reducerPath: "weeksApi",
  baseUrl: API_ROUTES.WEEKS_ROUTE,
  singleEntityName: API_ROUTES.WEEKS_ENTITY,
  listId: "weeks_list",
});
export const expensesApi = apiCreateCRUDHooks<ExpensesTableAPI>({
  reducerPath: "expensesApi",
  baseUrl: API_ROUTES.EXPENSES_ROUTE,
  singleEntityName: API_ROUTES.EXERCISES_ENTITY,
  listId: "expenses_list",
});
export const equipmentsApi = apiCreateCRUDHooks<EquipmentsTableAPI>({
  reducerPath: "equipmentsApi",
  baseUrl: API_ROUTES.EQUIPMENTS_ROUTE,
  singleEntityName: API_ROUTES.EQUIPMENTS_ENTITY,
  listId: "equipments_list",
});
export const exercisesApi = apiCreateCRUDHooks<ExercisesTableAPI>({
  reducerPath: "exercisesApi",
  baseUrl: API_ROUTES.EXERCISES_ROUTE,
  singleEntityName: API_ROUTES.EXERCISES_ENTITY,
  listId: "exercises_list",
});
export const trainingProgramsListApi =
  apiCreateCRUDHooks<TrainingProgramsListTableAPI>({
    reducerPath: "trainingProgramsListApi",
    baseUrl: API_ROUTES.TRAINING_PROGRAMS_LIST_ROUTE,
    singleEntityName: API_ROUTES.TRAINING_PROGRAMS_LIST_ENTITY,
    listId: "training_programs_list",
  });
export const trainingProgramsApi =
  apiCreateCRUDHooks<TrainingProgramExerciseTableAPI>({
    reducerPath: "trainingProgramsApi",
    baseUrl: API_ROUTES.TRAINING_PROGRAMS_ROUTE,
    singleEntityName: API_ROUTES.TRAINING_PROGRAMS_ENTITY,
    listId: "training_programs_exercises_list",
  }).injectEndpoints({
    endpoints: (builder) => ({
      getExerciseStats: builder.query<
        ResponseQueryAPI<ExerciseStatsAPI> & {
          stats: { graphStats: ChartsDataAPI<number[]> };
        },
        Record<string, any>
      >({
        query: (params) => ({ url: `/stats`, params }),
        providesTags: (result) =>
          providerTags(result?.data, "exerciseStats", "exerciseStatsList"),
      }),
    }),
  });
export const nutritionMenusListApi = apiCreateCRUDHooks<NutritionMenuTableApi>({
  reducerPath: "nutritionMenusListApi",
  baseUrl: API_ROUTES.NUTRITION_MENUS_LIST_ROUTE,
  singleEntityName: API_ROUTES.NUTRITION_MENUS_LIST_ENTITY,
  listId: "nutrition_menus_list",
});
export const nutritionMenuApi = apiCreateCRUDHooks<NutritionMenuAPI>({
  reducerPath: "nutritionMenuApi",
  baseUrl: API_ROUTES.NUTRITION_MENU_ROUTE,
  singleEntityName: API_ROUTES.NUTRITION_MENU_ENTITY,
  listId: "nutrition_menu_list",
}).injectEndpoints({
  endpoints: (builder) => ({
    getGenerateMenu: builder.query<any, { id: number }>({
      query: (params) => ({
        url: `/${API_ROUTES.NUTRITION_MENU_GENERATE}/${params.id}`,
        params,
      }),
      // providesTags: ["nutrition_menu_list"],
    }),
  }),
});
export const foodsApi = apiCreateCRUDHooks<FoodAPI>({
  reducerPath: "foodsApi",
  baseUrl: API_ROUTES.FOODS_ROUTE,
  singleEntityName: API_ROUTES.FOOD_ENTITY,
  listId: "foods_list",
});
export const nutritionQuestionnaireApi =
  apiCreateCRUDHooks<NutritionQuestionnaire>({
    reducerPath: "nutritionQuestionnaireApi",
    baseUrl: API_ROUTES.NUTRITION_QUESTIONNAIRE_ROUTE,
    singleEntityName: API_ROUTES.NUTRITION_QUESTIONNAIRE_ENTITY,
    listId: "nutrition_questionnaire",
  });

export const measuresApi = apiCreateCRUDHooks<MeasuresCalResAPI>({
  reducerPath: "measuresApi",
  baseUrl: API_ROUTES.MEASURES_ROUTE,
  singleEntityName: API_ROUTES.MEASURE_ENTITY,
  listId: "measures_list",
});

export const traineesApi = apiCreateCRUDHooks<TraineesTableExtendsAPI>({
  reducerPath: "traineesApi",
  baseUrl: API_ROUTES.TRAINEES_ROUTE,
  singleEntityName: API_ROUTES.TRAINEES_ENTITY,
  listId: "trainees_list",
}).injectEndpoints({
  endpoints: (builder) => ({
    getRegisterTrainee: builder.query<TraineesTableExtendsAPI, any>({
      query: ({
        id,
        verifyToken,
        ...rest
      }: {
        id: string;
        verifyToken: string;
      }) => {
        const headers = new Headers();
        headers.set("authorization", `Bearer ${verifyToken}`);
        return {
          url: `${API_ROUTES.TRAINEES_ENTITY}/${id}`,
          headers,
          params: { traineeID: id, ...rest },
        };
      },
    }),
    registerTrainee: builder.mutation({
      query: (body) => ({
        url: API_ROUTES.REGISTER_TRAINEE_ROUTE,
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: API_ROUTES.TRAINEES_ENTITY, id: "trainees_list" },
      ],
    }),
  }),
});

export const subscriptionPlansApi = apiCreateCRUDHooks<SubscriptionPlansAPI>({
  reducerPath: "subscriptionPlansApi",
  baseUrl: API_ROUTES.SUBSCRIPTION_PLANS_ROUTE,
  singleEntityName: API_ROUTES.SUBSCRIPTION_PLANS_ENTITY,
  listId: "subscription_plans_list",
});

export const alertsApi = apiCreateCRUDHooks<AlertsAPI>({
  reducerPath: "alertsApi",
  baseUrl: API_ROUTES.ALERTS_ROUTE,
  singleEntityName: API_ROUTES.ALERTS_ENTITY,
  listId: "alerts_list",
}).injectEndpoints({
  endpoints: (builder) => ({
    deleteAll: builder.mutation({
      query: () => ({
        url: ``,
        method: "delete",
      }),
      invalidatesTags: [{ type: API_ROUTES.ALERTS_ENTITY, id: "alerts_list" }],
    }),
  }),
});

export const incomesApi = apiCreateCRUDHooks<IncomesTableAPI>({
  reducerPath: "incomesApi",
  baseUrl: API_ROUTES.INCOMES_ROUTE,
  singleEntityName: API_ROUTES.INCOMES_ENTITY,
  listId: "incomes_list",
});
export const expenseApi = apiCreateCRUDHooks<ExpensesTableAPI>({
  reducerPath: "expenseApi",
  baseUrl: API_ROUTES.EXPENSES_ROUTE,
  singleEntityName: API_ROUTES.EXPENSES_ENTITY,
  listId: "expense_list",
});

export const financesApi = createApi({
  tagTypes: ["finances_list"],
  baseQuery: baseQueryWithReauth(API_ROUTES.FINANCES_ROUTE),
  endpoints: (builder) => ({
    getFinances: builder.query<FinanceAPI, GenericRecord<any>>({
      query: (params) => ({ url: "/", params }),
      providesTags: ["finances_list"],
    }),
  }),
});

export const productsApi = apiCreateCRUDHooks<ProductAPI>({
  reducerPath: "productsApi",
  baseUrl: API_ROUTES.PRODUCTS_ROUTE,
  singleEntityName: API_ROUTES.PRODUCT_ENTITY,
  listId: "products_list",
});
export const activitiesApi = apiCreateCRUDHooks<ActivitiesTableAPI>({
  reducerPath: "activitiesApi",
  baseUrl: API_ROUTES.ACTIVITIES_ROUTE,
  singleEntityName: API_ROUTES.ACTIVITIES_ENTITY,
  listId: "activities_list",
});
export const participantsGroupApi =
  apiCreateCRUDHooks<ParticipantsGroupTableAPI>({
    reducerPath: "participantsGroupApi",
    baseUrl: API_ROUTES.PARTICIPANTS_GROUP_ROUTE,
    singleEntityName: API_ROUTES.PARTICIPANTS_GROUP_ENTITY,
    listId: "participantsGroup_list",
  });
export const participantsGroupsListApi =
  apiCreateCRUDHooks<ParticipantsGroupsListTableAPI>({
    reducerPath: "participantsGroupsListApi",
    baseUrl: API_ROUTES.PARTICIPANTS_GROUPS_LIST_ROUTE,
    singleEntityName: API_ROUTES.PARTICIPANTS_GROUPS_LIST_ENTITY,
    listId: "participantsGroups_list",
  });

export const meetingApi = apiCreateCRUDHooks<MeetingAPI>({
  reducerPath: "meetingApi",
  baseUrl: API_ROUTES.MEETINGS_ROUTE,
  singleEntityName: API_ROUTES.MEETINGS_ENTITY,
  listId: "meetings_list",
});

export const emailAPi = createApi({
  reducerPath: "emailApi",
  baseQuery: baseQueryWithReauth(`${API_ROUTES.API_AUTH_ROUTE}`),
  endpoints: (builder) => ({
    resendEmail: builder.query({
      query: (params) => ({ url: `/${API_ROUTES.RESEND_EMAIL_ROUTE}`, params }),
    }),
  }),
});
// export type ApiCRUDHooks = ReturnType<typeof apiCreateCRUDHooks<any>>;

export const apiCreateCrudArr = [
  leadsApi,
  musclesGroupApi,
  citiesApi,
  locationsApi,
  providersApi,
  weeksApi,
  expensesApi,
  equipmentsApi,
  exercisesApi,
  trainingProgramsListApi,
  trainingProgramsApi,
  nutritionMenusListApi,
  nutritionMenuApi,
  measuresApi,
  traineesApi,
  usersApi,
  subscriptionPlansApi,
  alertsApi,
  incomesApi,
  expenseApi,
  productsApi,
  activitiesApi,
  meetingApi,
  participantsGroupApi,
  participantsGroupsListApi,
  foodsApi,
  nutritionQuestionnaireApi,
  financesApi,
  emailAPi,
];

// Create Reducer arr that contains  object with key of the reducer name and value the reducer function.
// eslint-disable-next-line import/no-mutable-exports
let reducersObj: Record<string, Reducer> = {};
apiCreateCrudArr.forEach((value) => {
  reducersObj = { ...reducersObj, [value.reducerPath]: value.reducer };
});

export { reducersObj };

// Create middlewareArr from the apiCreateCrudArr.
export const middlewareArr = apiCreateCrudArr.map((el) => el.middleware);
