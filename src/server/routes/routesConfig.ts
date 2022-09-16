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
  notesSchema,
  nutritionProgramSchema,
  nutritionProgramsListSchema,
  providersSchema,
  traineesSchema,
  trainingProgramSchema,
  trainingProgramsListSchema,
  weeksSchema,
} from "../schemas/DBSchemas";
import {
  CITIES_TABLE_NAME,
  CITY_ID,
  EQUIPMENTS_ID,
  EQUIPMENTS_TABLE_NAME,
  EXERCISES_ID,
  EXERCISES_LIST_TABLE_NAME,
  EXPENSES_ID,
  EXPENSES_TABLE_NAME,
  INCOME_ID,
  INCOMES_TABLE_NAME,
  LOCATION_ID,
  LOCATION_TABLE_NAME,
  MUSCLES_GROUP_TABLE_NAME,
  MUSCLE_GROUP_ID,
  NOTES_TABLE_NAME,
  NOTE_ID,
  NUTRITION_PROGRAM_LIST_ID,
  NUTRITION_PROGRAM_LIST_TABLE_NAME,
  NUTRITION_PROGRAM_TABLE_NAME,
  PROVIDERS_ID,
  PROVIDERS_TABLE_NAME,
  TRAINING_PROGRAMS_LIST_ID,
  TRAINING_PROGRAMS_LIST_TABLE_NAME,
  TRAINING_PROGRAM_ID,
  TRAINING_PROGRAM_TABLE_NAME,
  WEEKLY_ID,
  WEEKLY_TABLE_NAME,
  SUBSCRIPTION_PLANS_TABLE_ID,
  SUBSCRIPTION_PLANS_TABLE_NAME,
  LEADS_TABLE_NAME,
  LEADS_TABLE_ID,
  NUTRITION_PROGRAM_ID,
  PROFILE_ID,
  PROFILES_TABLE_NAME,
} from "../utilities/constants";
import { API_ROUTES } from "./apiRoutesConstants";

export interface InsertOtherTable {
  tableName: string;
  id: string;
  keysPossible: string[];
}
export interface SelectTableQueryParam {
  tableName: string;
  tableID: string;
  fieldNamesQuery: string; // The field names that we want to return from the query
  querySelectLogic: string; // The query logic
  subTableID?: string;
  idSearch?: string; // ID of the main table which we search for data.
  selectQueriesParams?: SelectTableQueryParam[];
  subTableKeys?: Record<string, string[]>;
  queryParams?: Record<string, string>;
  queryNameParam?: Record<string, string>; // Field to search by name,the first field with name key is the main query.
}
export interface SelectOtherTable {
  selectQueriesParams: SelectTableQueryParam[];
  transformFunction: <T, K>(object: T) => K;
}

export interface OptionsCRUD {
  singleEntityName: string; // name of one item
  selectQuery: SelectTableQueryParam;
  insertDataToOtherTables?: InsertOtherTable[]; // The data of tables we wish to insert data
  selectOtherTablesQueries?: SelectOtherTable;
  validateSchema: yup.ObjectSchema<any>;
}

// The setting of the routes.
// Each one contains the options CRUD and validate schema to validte
// the input of the user.
//

export const leadsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.LEADS_ENTITY,
  selectQuery: {
    tableName: `${LEADS_TABLE_NAME} as le`,
    tableID: `le.${LEADS_TABLE_ID}`,
    fieldNamesQuery: `le.*,no.name_topic,no.note_text`,
    querySelectLogic: ` LEFT JOIN ${NOTES_TABLE_NAME} as no ON 
    le.${NOTE_ID}=no.${NOTE_ID}`,
  },
  insertDataToOtherTables: [
    {
      tableName: NOTES_TABLE_NAME,
      id: NOTE_ID,
      keysPossible: [NOTE_ID, "name_topic", "note_text"],
    },
  ],
  validateSchema: leadsSchema.concat(notesSchema),
};

export const musclesGroupOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.MUSCLES_GROUP_ENTITY,
  selectQuery: {
    tableName: `${MUSCLES_GROUP_TABLE_NAME} as mg`,
    tableID: `mg.${MUSCLE_GROUP_ID}`,
    fieldNamesQuery: "*",
    querySelectLogic: ``,
  },

  validateSchema: musclesGroupSchema,
};
export const notesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.NOTES_ENTITY,
  selectQuery: {
    tableName: `${NOTES_TABLE_NAME} as n`,
    tableID: `n.${NOTE_ID}`,
    fieldNamesQuery: "*",
    querySelectLogic: "",
  },
  validateSchema: notesSchema,
};

export const citiesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.CITIES_ENTITY,
  selectQuery: {
    tableName: `${CITIES_TABLE_NAME} as c`,
    tableID: `c.${CITY_ID}`,
    fieldNamesQuery: "*",
    querySelectLogic: ``,
  },

  validateSchema: citiesSchema,
};

export const locationsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.LOCATIONS_ENTITY,
  selectQuery: {
    tableName: `${LOCATION_TABLE_NAME} as lo`,
    tableID: `lo.${LOCATION_ID}`,
    fieldNamesQuery: "lo.*,c.city_name ",
    querySelectLogic: `JOIN ${CITIES_TABLE_NAME} as c ON
    c.${CITY_ID}=lo.${CITY_ID} `,
    queryNameParam: {
      name: "street",
      cityName: "city_name",
    },
  },

  validateSchema: locationsSchema,
};
export const providersOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.PROVIDERS_ENTITY,
  selectQuery: {
    tableName: `${PROVIDERS_TABLE_NAME} as pro`,
    tableID: `pro.${PROVIDERS_ID}`,
    fieldNamesQuery: "pro.*,lo.street , c.city_name",
    querySelectLogic: `
    JOIN ${LOCATION_TABLE_NAME} as lo on 
    pro.${LOCATION_ID} = lo.${LOCATION_ID}
    JOIN ${CITIES_TABLE_NAME} as c ON 
    c.${CITY_ID}=lo.${CITY_ID}
    `,
  },
  validateSchema: providersSchema,
};

export const weeksOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.WEEKS_ROUTE,
  selectQuery: {
    tableName: `${WEEKLY_TABLE_NAME} as we`,
    tableID: `we.${WEEKLY_ID}`,
    fieldNamesQuery: "*",
    querySelectLogic: ``,
  },
  validateSchema: weeksSchema,
};

export const expensesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.EXPENSES_ENTITY,
  selectQuery: {
    tableName: `${EXPENSES_TABLE_NAME} as ex`,
    tableID: `ex.${EXPENSES_ID}`,
    fieldNamesQuery: `ex.*, pr.provider_name`,
    querySelectLogic: `JOIN ${PROVIDERS_TABLE_NAME} as pr on 
   ex.seller_id=pr.${PROVIDERS_ID}
   `,
  },
  validateSchema: expensesSchema,
};

export const equipmentsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.EQUIPMENTS_ENTITY,
  selectQuery: {
    tableName: `${EQUIPMENTS_TABLE_NAME} as eq`,
    tableID: `eq.${EQUIPMENTS_ID}`,
    fieldNamesQuery: `*`,
    querySelectLogic: ``,
  },
  validateSchema: equipmentSchema,
};

export const exerciseListOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.EXERCISES_ENTITY,
  selectQuery: {
    tableName: `${EXERCISES_LIST_TABLE_NAME} as exer`,
    tableID: EXERCISES_ID,
    fieldNamesQuery: `exer.* , mg.muscles_group_name , eq.equipment_name `,
    querySelectLogic: `JOIN ${MUSCLES_GROUP_TABLE_NAME} as mg on 
    mg.${MUSCLE_GROUP_ID}=exer.${MUSCLE_GROUP_ID} JOIN ${EQUIPMENTS_TABLE_NAME} as eq on 
   eq.${EQUIPMENTS_ID}=exer.${EQUIPMENTS_ID} `,
  },
  validateSchema: exercisesListSchema,
};

export const trainingProgramsListOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.TRAINING_PROGRAMS_LIST_ENTITY,
  selectQuery: {
    tableName: `${TRAINING_PROGRAMS_LIST_TABLE_NAME} as trpl`,
    tableID: `trpl.${TRAINING_PROGRAMS_LIST_ID}`,
    fieldNamesQuery: `trpl.*, 
  
    no.name_topic,no.note_text
 
    `,

    querySelectLogic: `
    LEFT JOIN ${TRAINING_PROGRAM_TABLE_NAME} as tp ON
    trpl.${TRAINING_PROGRAMS_LIST_ID}=tp.${TRAINING_PROGRAMS_LIST_ID}

     LEFT JOIN ${NOTES_TABLE_NAME} as no ON 
     trpl.${NOTE_ID}=no.${NOTE_ID}
  
    `,

    queryParams: {
      traineeID: PROFILE_ID,
    },
  },

  validateSchema: trainingProgramsListSchema.concat(notesSchema),
  insertDataToOtherTables: [
    {
      tableName: NOTES_TABLE_NAME,
      id: NOTE_ID,
      keysPossible: [NOTE_ID, "name_topic", "note_text"],
    },
  ],
};

export const trainingProgramsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.TRAINING_PROGRAMS_ENTITY,
  selectQuery: {
    tableName: `${TRAINING_PROGRAM_TABLE_NAME} as tp`,
    tableID: `tp.${TRAINING_PROGRAM_ID}`,
    fieldNamesQuery: `tp.*, 
    mg.muscles_group_name, eq.equipment_name,
    exer.exercise_name,
    no.name_topic,no.note_text`,
    querySelectLogic: `
    LEFT JOIN ${EXERCISES_LIST_TABLE_NAME} as exer ON
    tp.${EXERCISES_ID}=exer.${EXERCISES_ID}
    LEFT JOIN ${MUSCLES_GROUP_TABLE_NAME} as mg ON
    exer.${MUSCLE_GROUP_ID} =mg.${MUSCLE_GROUP_ID}
    LEFT JOIN ${EQUIPMENTS_TABLE_NAME} as eq ON
    exer.${EQUIPMENTS_ID}= eq.${EQUIPMENTS_ID}
    LEFT JOIN ${NOTES_TABLE_NAME} as no ON 
    tp.${NOTE_ID}=no.${NOTE_ID}`,
    queryParams: {
      trainingProgramListID: TRAINING_PROGRAMS_LIST_ID,
    },
  },
  insertDataToOtherTables: [
    {
      tableName: NOTES_TABLE_NAME,
      id: NOTE_ID,
      keysPossible: [NOTE_ID, "name_topic", "note_text"],
    },
  ],
  validateSchema: trainingProgramSchema.concat(notesSchema),
};

export const nutritionProgramOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.NUTRITION_PROGRAMS_ENITITY,
  selectQuery: {
    tableName: `${NUTRITION_PROGRAM_TABLE_NAME} as np`,
    tableID: `np.${NUTRITION_PROGRAM_ID}`,
    fieldNamesQuery: `*`,
    querySelectLogic: ``,
  },
  validateSchema: nutritionProgramSchema,
};

export const nutritionProgramsListOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.NUTRITION_PROGRAMS_LIST_ENTITY,
  selectQuery: {
    tableName: `${NUTRITION_PROGRAM_LIST_TABLE_NAME} as npl`,
    tableID: `npl.${NUTRITION_PROGRAM_LIST_ID}`,
    fieldNamesQuery: `npl.*,
    np.week_id,
    np.note_id as week_note_id,
    we.date,we.day,we.weight,
    no.name_topic,no.note_text`,
    querySelectLogic: `
    LEFT JOIN ${PROFILES_TABLE_NAME} as tr ON
    npl.${PROFILE_ID}=tr.${PROFILE_ID}
    LEFT JOIN  ${NUTRITION_PROGRAM_TABLE_NAME} as np ON
    npl.${NUTRITION_PROGRAM_LIST_ID}=np.${NUTRITION_PROGRAM_LIST_ID}
    LEFT JOIN ${WEEKLY_TABLE_NAME} as we ON 
    we.${WEEKLY_ID}=np.${WEEKLY_ID} 
    LEFT JOIN ${NOTES_TABLE_NAME} as no ON 
    npl.${NOTE_ID}=no.${NOTE_ID}
    `,
  },
  validateSchema: nutritionProgramsListSchema,
};

export const subscriptionPlansOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.SUBSCRIPTION_PLANS_ENTITY,
  selectQuery: {
    tableName: `${SUBSCRIPTION_PLANS_TABLE_NAME} as subp`,
    tableID: `subp.${SUBSCRIPTION_PLANS_TABLE_ID}`,
    fieldNamesQuery: `subp.*`,
    querySelectLogic: ``,
  },
  validateSchema: subscriptionPlansSchema,
};

export const traineesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.TRAINEES_ENTITY,
  selectQuery: {
    tableName: `${PROFILES_TABLE_NAME} as pr`,
    tableID: `pr.${PROFILE_ID}`,
    fieldNamesQuery: `
    pr.*, lo.street ,
     c.city_name , 
    tpl.${TRAINING_PROGRAMS_LIST_ID},
    npl.${NUTRITION_PROGRAM_LIST_ID} `,
    querySelectLogic: `
    JOIN ${LOCATION_TABLE_NAME} as lo ON 
    pr.${LOCATION_ID}=lo.${LOCATION_ID} JOIN ${CITIES_TABLE_NAME} as c on 
   c.${CITY_ID}=lo.${CITY_ID} 
   LEFT JOIN ${TRAINING_PROGRAMS_LIST_TABLE_NAME} as tpl ON
   tpl.${PROFILE_ID}=pr.${PROFILE_ID}
   LEFT JOIN ${NUTRITION_PROGRAM_LIST_TABLE_NAME} as npl ON
   npl.${PROFILE_ID}=pr.${PROFILE_ID}

   `,
    queryNameParam: {
      name: "first_name",
      lastName: "last_name",
    },
  },
  selectOtherTablesQueries: {
    selectQueriesParams: [
      {
        ...trainingProgramsListOptionsCRUD.selectQuery,
        idSearch: `trpl.${TRAINING_PROGRAMS_LIST_ID}`,
        subTableID: TRAINING_PROGRAMS_LIST_ID,
      },
      {
        ...nutritionProgramsListOptionsCRUD.selectQuery,
        subTableID: NUTRITION_PROGRAM_LIST_TABLE_NAME,
        subTableKeys: { nutritionProgram: ["date", "day", "weight"] },
      },
    ],
    transformFunction: (arg: any) => ({} as any),
  },
  validateSchema: traineesSchema,
};

export const incomesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.INCOMES_ROUTE,
  selectQuery: {
    tableName: `${INCOMES_TABLE_NAME} as in`,
    tableID: `in.${INCOME_ID}`,
    fieldNamesQuery: ` in.*, pr.first_name,pr.last_name,`,
    querySelectLogic: `JOIN ${PROFILES_TABLE_NAME} as pr ON 
    pr.${PROFILE_ID}=in.buyer_id `,
  },
  validateSchema: incomesSchema,
};

// Array of the baseRoutes and the router paramas.
export const routesCRUDArr: {
  baseRoute: string;
  optionsCRUD: OptionsCRUD;
}[] = [
  {
    baseRoute: API_ROUTES.LEADS_ROUTE,
    optionsCRUD: leadsOptionsCRUD,
  },
  {
    baseRoute: API_ROUTES.MUSCLES_GROUP_ROUTE,
    optionsCRUD: musclesGroupOptionsCRUD,
  },
  { baseRoute: API_ROUTES.NOTES_ROUTE, optionsCRUD: notesOptionsCRUD },
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
