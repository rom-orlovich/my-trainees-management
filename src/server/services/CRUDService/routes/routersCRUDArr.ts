import { Router } from "express";
import { API_ROUTES } from "../../apiRoutesConstants";
import {
  activityOptionsCRUD,
  citiesOptionsCRUD,
  equipmentsOptionsCRUD,
  exerciseListOptionsCRUD,
  expensesOptionsCRUD,
  foodsOptionsCRUD,
  leadsOptionsCRUD,
  locationsOptionsCRUD,
  musclesGroupOptionsCRUD,
  nutritionMenusListOptionsCRUD,
  participantsGroupListOptionsCRUD,
  participantsGroupOptionsCRUD,
  productsOptionsCRUD,
  providersOptionsCRUD,
  subscriptionPlansOptionsCRUD,
  trainingProgramsExerciseStatsOptionsCRUD,
  trainingProgramsListOptionsCRUD,
  trainingProgramsOptionsCRUD,
  usersOptionsCRUD,
} from "./configRoutes";
import { createCRUDroutes } from "./createCRUDroutes";
import {
  createAlertsRouter,
  createFinanceRouter,
  createIncomesRouter,
  createMeasuresRouter,
  createMeetingRouter,
  createNutritionMenuRouter,
  createNutritionQuestionnaireRouter,
  createTraineesRouter,
} from "./customRouters";

// Array of the baseRoutes and the router params.
export const routesConfigArr: {
  baseRoute: string;
  router: Router;
}[] = [
  {
    baseRoute: API_ROUTES.USERS_ROUTE,
    router: createCRUDroutes(usersOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.ALERT_ROUTE,
    router: createAlertsRouter(),
  },

  {
    baseRoute: API_ROUTES.LEADS_ROUTE,
    router: createCRUDroutes(leadsOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.MUSCLES_GROUP_ROUTE,
    router: createCRUDroutes(musclesGroupOptionsCRUD),
  },

  {
    baseRoute: API_ROUTES.CITIES_ROUTE,
    router: createCRUDroutes(citiesOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.LOCATIONS_ROUTE,
    router: createCRUDroutes(locationsOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.PROVIDERS_ROUTE,
    router: createCRUDroutes(providersOptionsCRUD),
  },

  {
    baseRoute: API_ROUTES.EQUIPMENTS_ROUTE,
    router: createCRUDroutes(equipmentsOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.EXERCISES_ROUTE,
    router: createCRUDroutes(exerciseListOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.TRAINING_PROGRAMS_LIST_ROUTE,
    router: createCRUDroutes(trainingProgramsListOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.EXERCISES_STATS_ROUTE,
    router: createCRUDroutes(trainingProgramsExerciseStatsOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.TRAINING_PROGRAMS_ROUTE,
    router: createCRUDroutes(trainingProgramsOptionsCRUD),
  },

  {
    baseRoute: API_ROUTES.SUBSCRIPTION_PLANS_ROUTE,
    router: createCRUDroutes(subscriptionPlansOptionsCRUD),
  },

  {
    baseRoute: API_ROUTES.PRODUCTS_ROUTE,
    router: createCRUDroutes(productsOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.INCOMES_ROUTE,
    router: createIncomesRouter(),
  },
  {
    baseRoute: API_ROUTES.EXPENSES_ROUTE,
    router: createCRUDroutes(expensesOptionsCRUD),
  },

  { baseRoute: API_ROUTES.MEASURES_ROUTE, router: createMeasuresRouter() },
  {
    baseRoute: API_ROUTES.TRAINEES_ROUTE,
    router: createTraineesRouter(),
  },
  {
    baseRoute: API_ROUTES.PARTICIPANTS_GROUP_ROUTE,
    router: createCRUDroutes(participantsGroupOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.PARTICIPANTS_GROUPS_LIST_ROUTE,
    router: createCRUDroutes(participantsGroupListOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.ACTIVITIES_ROUTE,
    router: createCRUDroutes(activityOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.MEETINGS_ROUTE,
    router: createMeetingRouter(),
  },
  {
    baseRoute: API_ROUTES.FINANCES_ROUTE,
    router: createFinanceRouter(),
  },
  {
    baseRoute: API_ROUTES.NUTRITION_MENUS_LIST_ROUTE,
    router: createCRUDroutes(nutritionMenusListOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.NUTRITION_MENU_ROUTE,
    router: createNutritionMenuRouter(),
  },
  {
    baseRoute: API_ROUTES.FOODS_ROUTE,
    router: createCRUDroutes(foodsOptionsCRUD),
  },
  {
    baseRoute: API_ROUTES.NUTRITION_QUESTIONNAIRE_ROUTE,
    router: createNutritionQuestionnaireRouter(),
  },
];
