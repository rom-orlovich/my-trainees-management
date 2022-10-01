/* eslint-disable no-unused-vars */
import * as yup from "yup";

import {
  citiesSchema,
  equipmentSchema,
  exercisesListSchema,
  expensesSchema,
  incomesSchema,
  leadsSchema,
  locationsSchema,
  subscriptionPlansSchema,
  musclesGroupSchema,
  nutritionProgramSchema,
  nutritionProgramsListSchema,
  providersSchema,
  traineesSchema,
  trainingProgramSchema,
  trainingProgramsListSchema,
  weeksSchema,
} from "../../schemas/DBSchemas";
import { TABLES_DATA } from "../../../utilities/constants";
import { API_ROUTES } from "../../apiRoutesConstants";

export interface SelectTableQueryParam {
  tableName: string;
  tableID: string;
  fieldNamesQuery: string; // The field names that we want to return from the query
  querySelectLogic: string; // The query logic

  // The purpose of below params is to encapsulate the real table's fields from the client,
  // so the client won't able to know what are the real fields name of the table.
  queryParams?: Record<string, string>;
  queryNameParam?: Record<string, string>;
  insertInto?: Record<string, string>;
}

export interface OptionsCRUD {
  singleEntityName: string; // name of one item
  selectQuery: SelectTableQueryParam;
  validateSchema?: yup.ObjectSchema<any>;
  permissions?: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  logAlert?: boolean;
}

// The setting of the routes.
// Each one contains the options CRUD and validate schema to validate
// the input of the user.

export const usersOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.USER_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.USERS_TABLE_NAME} as us`,
    tableID: `us.${TABLES_DATA.USERS_TABLE_ID}`,
    fieldNamesQuery: `*`,
    querySelectLogic: ``,
  },
};

export const alertsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.ALERT_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.ALERTS_TABLE_NAME} as ale`,
    tableID: `ale.${TABLES_DATA.ALERTS_TABLE_ID}`,
    fieldNamesQuery: `*`,
    querySelectLogic: ``,
  },
  logAlert: false,
};
export const leadsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.LEADS_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.LEADS_TABLE_NAME} as le`,
    tableID: `le.${TABLES_DATA.LEADS_TABLE_ID}`,
    fieldNamesQuery: `le.*`,
    querySelectLogic: ``,
    queryNameParam: {
      mainName: "first_name",
      lastName: "last_name",
    },
  },

  validateSchema: leadsSchema,
};

export const musclesGroupOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.MUSCLES_GROUP_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.MUSCLES_GROUP_TABLE_NAME} as mg`,
    tableID: `mg.${TABLES_DATA.MUSCLE_GROUP_ID}`,
    fieldNamesQuery: "*",
    querySelectLogic: ``,
    queryNameParam: {
      mainName: "muscles_group_name",
    },
  },

  validateSchema: musclesGroupSchema,
};

export const citiesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.CITIES_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.CITIES_TABLE_NAME} as c`,
    tableID: `c.${TABLES_DATA.CITY_ID}`,
    fieldNamesQuery: "*",
    querySelectLogic: ``,
    queryNameParam: {
      mainName: "city_name",
    },
  },

  validateSchema: citiesSchema,
};

export const locationsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.LOCATIONS_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.LOCATION_TABLE_NAME} as lo`,
    tableID: `lo.${TABLES_DATA.LOCATION_ID}`,
    fieldNamesQuery: "lo.*,c.city_name ",
    querySelectLogic: `JOIN ${TABLES_DATA.CITIES_TABLE_NAME} as c ON
    c.${TABLES_DATA.CITY_ID}=lo.${TABLES_DATA.CITY_ID} `,
    queryNameParam: {
      mainName: "street",
      cityName: "city_name",
    },
  },
  validateSchema: locationsSchema,
};
export const providersOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.PROVIDERS_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.PROVIDERS_TABLE_NAME} as pro`,
    tableID: `pro.${TABLES_DATA.PROVIDERS_ID}`,
    fieldNamesQuery: "pro.*,lo.street , c.city_name",
    querySelectLogic: `
    JOIN ${TABLES_DATA.LOCATION_TABLE_NAME} as lo on 
    pro.${TABLES_DATA.LOCATION_ID} = lo.${TABLES_DATA.LOCATION_ID}`,
    queryNameParam: {
      mainName: "provider_name",
    },
  },
  validateSchema: providersSchema,
};

export const weeksOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.WEEKS_ROUTE,
  selectQuery: {
    tableName: `${TABLES_DATA.WEEKLY_TABLE_NAME} as we`,
    tableID: `we.${TABLES_DATA.WEEKLY_ID}`,
    fieldNamesQuery: "*",
    querySelectLogic: ``,
  },
  validateSchema: weeksSchema,
};

export const expensesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.EXPENSES_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.EXPENSES_TABLE_NAME} as ex`,
    tableID: `ex.${TABLES_DATA.EXPENSES_ID}`,
    fieldNamesQuery: `ex.*, pr.provider_name`,
    querySelectLogic: `JOIN ${TABLES_DATA.PROVIDERS_TABLE_NAME} as pr on 
   ex.seller_id=pr.${TABLES_DATA.PROVIDERS_ID}
   `,
  },
  validateSchema: expensesSchema,
};

export const equipmentsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.EQUIPMENTS_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.EQUIPMENTS_TABLE_NAME} as eq`,
    tableID: `eq.${TABLES_DATA.EQUIPMENTS_ID}`,
    fieldNamesQuery: `*`,
    querySelectLogic: ``,
    queryNameParam: {
      mainName: "equipment_name",
    },
  },
  validateSchema: equipmentSchema,
};

export const exerciseListOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.EXERCISES_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.EXERCISES_LIST_TABLE_NAME} as exer`,
    tableID: TABLES_DATA.EXERCISES_ID,
    fieldNamesQuery: `exer.* , mg.muscles_group_name , eq.equipment_name `,
    querySelectLogic: `JOIN ${TABLES_DATA.MUSCLES_GROUP_TABLE_NAME} as mg on 
    mg.${TABLES_DATA.MUSCLE_GROUP_ID}=exer.${TABLES_DATA.MUSCLE_GROUP_ID} JOIN ${TABLES_DATA.EQUIPMENTS_TABLE_NAME} as eq on 
   eq.${TABLES_DATA.EQUIPMENTS_ID}=exer.${TABLES_DATA.EQUIPMENTS_ID} `,
    queryNameParam: {
      mainName: "exercise_name",
    },
  },
  validateSchema: exercisesListSchema,
};

export const trainingProgramsListOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.TRAINING_PROGRAMS_LIST_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.TRAINING_PROGRAMS_LIST_TABLE_NAME} as trpl`,
    tableID: `trpl.${TABLES_DATA.TRAINING_PROGRAMS_LIST_ID}`,
    fieldNamesQuery: `trpl.*`,
    querySelectLogic: `
    LEFT JOIN ${TABLES_DATA.TRAINING_PROGRAM_TABLE_NAME} as tp ON
    trpl.${TABLES_DATA.TRAINING_PROGRAMS_LIST_ID}=
    tp.${TABLES_DATA.TRAINING_PROGRAMS_LIST_ID}`,
    queryParams: {
      traineeID: TABLES_DATA.TRAINEE_ID,
    },
  },

  validateSchema: trainingProgramsListSchema,
};

export const trainingProgramsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.TRAINING_PROGRAMS_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.TRAINING_PROGRAM_TABLE_NAME} as tp`,
    tableID: `tp.${TABLES_DATA.TRAINING_PROGRAM_ID}`,
    fieldNamesQuery: `tp.*, 
    mg.muscles_group_name, eq.equipment_name,
    exer.exercise_name`,
    querySelectLogic: `
    LEFT JOIN ${TABLES_DATA.EXERCISES_LIST_TABLE_NAME} as exer ON
    tp.${TABLES_DATA.EXERCISES_ID}=exer.${TABLES_DATA.EXERCISES_ID}
    LEFT JOIN ${TABLES_DATA.MUSCLES_GROUP_TABLE_NAME} as mg ON
    exer.${TABLES_DATA.MUSCLE_GROUP_ID} =mg.${TABLES_DATA.MUSCLE_GROUP_ID}
    LEFT JOIN ${TABLES_DATA.EQUIPMENTS_TABLE_NAME} as eq ON
    exer.${TABLES_DATA.EQUIPMENTS_ID}= eq.${TABLES_DATA.EQUIPMENTS_ID}`,
    queryParams: {
      trainingProgramListID: TABLES_DATA.TRAINING_PROGRAMS_LIST_ID,
    },
  },

  validateSchema: trainingProgramSchema,
};

export const nutritionProgramOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.NUTRITION_PROGRAMS_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.NUTRITION_PROGRAM_TABLE_NAME} as np`,
    tableID: `np.${TABLES_DATA.NUTRITION_PROGRAM_ID}`,
    fieldNamesQuery: `*`,
    querySelectLogic: ``,
  },
  validateSchema: nutritionProgramSchema,
};

export const nutritionProgramsListOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.NUTRITION_PROGRAMS_LIST_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.NUTRITION_PROGRAM_LIST_TABLE_NAME} as npl`,
    tableID: `npl.${TABLES_DATA.NUTRITION_PROGRAM_LIST_ID}`,
    fieldNamesQuery: `npl.*,
    np.week_id,
    np.note_id as week_note_id,
    we.date,we.day,we.weight`,
    querySelectLogic: `
    LEFT JOIN ${TABLES_DATA.TRAINEES_TABLE_NAME} as tr ON
    npl.${TABLES_DATA.TRAINEE_ID}=tr.${TABLES_DATA.TRAINEE_ID}
    LEFT JOIN  ${TABLES_DATA.NUTRITION_PROGRAM_TABLE_NAME} as np ON
    npl.${TABLES_DATA.NUTRITION_PROGRAM_LIST_ID}=np.${TABLES_DATA.NUTRITION_PROGRAM_LIST_ID}
    LEFT JOIN ${TABLES_DATA.WEEKLY_TABLE_NAME} as we ON 
    we.${TABLES_DATA.WEEKLY_ID}=np.${TABLES_DATA.WEEKLY_ID} `,
  },
  validateSchema: nutritionProgramsListSchema,
};

export const subscriptionPlansOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.SUBSCRIPTION_PLANS_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.SUBSCRIPTION_PLANS_TABLE_NAME} as subp`,
    tableID: `subp.${TABLES_DATA.SUBSCRIPTION_PLANS_TABLE_ID}`,
    fieldNamesQuery: `subp.*`,
    querySelectLogic: ``,
  },
  validateSchema: subscriptionPlansSchema,
};

export const traineesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.TRAINEES_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.TRAINEES_TABLE_NAME} as tr`,
    tableID: `tr.${TABLES_DATA.TRAINEE_ID}`,
    fieldNamesQuery: `
    tr.trainee_id,tr.user_id,
    pr.*, lo.street ,
     c.city_name `,
    querySelectLogic: `
    JOIN ${TABLES_DATA.PROFILES_TABLE_NAME} as pr ON 
    tr.${TABLES_DATA.PROFILE_ID}=pr.${TABLES_DATA.PROFILE_ID}
    JOIN ${TABLES_DATA.LOCATION_TABLE_NAME} as lo ON 
    pr.${TABLES_DATA.LOCATION_ID}=lo.${TABLES_DATA.LOCATION_ID} JOIN ${TABLES_DATA.CITIES_TABLE_NAME} as c on 
   c.${TABLES_DATA.CITY_ID}=lo.${TABLES_DATA.CITY_ID} `,
    queryNameParam: {
      mainName: "first_name",
      lastName: "last_name",
    },
  },

  validateSchema: traineesSchema,
};

export const incomesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.INCOMES_ROUTE,
  selectQuery: {
    tableName: `${TABLES_DATA.INCOMES_TABLE_NAME} as in`,
    tableID: `in.${TABLES_DATA.INCOME_ID}`,
    fieldNamesQuery: ` in.*, pr.first_name,pr.last_name,`,
    querySelectLogic: `JOIN ${TABLES_DATA.TRAINEES_TABLE_NAME} as pr ON 
    pr.${TABLES_DATA.TRAINEE_ID}=in.buyer_id `,
  },
  validateSchema: incomesSchema,
};

// Array of the baseRoutes and the router params.
export const routesCRUDArr: {
  baseRoute: string;
  optionsCRUD: OptionsCRUD;
}[] = [
  {
    baseRoute: API_ROUTES.USERS_ROUTE,
    optionsCRUD: usersOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.ALERT_ROUTE,
    optionsCRUD: alertsOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.LEADS_ROUTE,
    optionsCRUD: leadsOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.MUSCLES_GROUP_ROUTE,
    optionsCRUD: musclesGroupOptionsCRUD,
  },

  { baseRoute: API_ROUTES.CITIES_ROUTE, optionsCRUD: citiesOptionsCRUD },
  {
    baseRoute: API_ROUTES.LOCATIONS_ROUTE,
    optionsCRUD: locationsOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.PROVIDERS_ROUTE,
    optionsCRUD: providersOptionsCRUD,
  },
  { baseRoute: API_ROUTES.WEEKS_ROUTE, optionsCRUD: weeksOptionsCRUD },
  {
    baseRoute: API_ROUTES.EXPENSES_ROUTE,
    optionsCRUD: expensesOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.EQUIPMENTS_ROUTE,
    optionsCRUD: equipmentsOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.EXERCISES_ROUTE,
    optionsCRUD: exerciseListOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.TRAINING_PROGRAMS_LIST_ROUTE,
    optionsCRUD: trainingProgramsListOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.TRAINING_PROGRAMS_ROUTE,
    optionsCRUD: trainingProgramsOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.NUTRITION_PROGRAMS_LIST_ROUTE,
    optionsCRUD: nutritionProgramsListOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.NUTRITION_PROGRAMS_ROUTE,
    optionsCRUD: nutritionProgramOptionsCRUD,
  },

  {
    baseRoute: API_ROUTES.TRAINEES_ROUTE,
    optionsCRUD: traineesOptionsCRUD,
  },

  {
    baseRoute: API_ROUTES.SUBSCRIPTION_PLANS_ROUTE,
    optionsCRUD: subscriptionPlansOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.INCOMES_ROUTE,
    optionsCRUD: incomesOptionsCRUD,
  },
];