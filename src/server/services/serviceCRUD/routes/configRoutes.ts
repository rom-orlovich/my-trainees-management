/* eslint-disable no-unused-vars */

import { Router } from "express";
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
  trainingProgramExerciseStatsSchema,
  measuresSchema,
  productSchema,
} from "../../schemas/DBSchemas";
import { TABLES_DATA } from "../../../utilities/constants";
import { API_ROUTES } from "../../apiRoutesConstants";
import {
  PERMISSION_ADMIN,
  PERMISSION_TRAINEE_WITHOUT_UPDATE,
  PERMISSION_TRAINER_BY_USER_ID,
  PERMISSION_TRAINEE,
  PERMISSION_TRAINEE_READONLY,
  PERMISSION_TRAINEE_WITHOUT_DELETE_CREATE,
  PERMISSION_TRAINER_BY_USER_ID_READ_ALL,
  PERMISSION_TRAINEE_BY_USER_ID,
} from "../../usersPermission";
import { OptionsCRUD } from "../serviceCRUDTypes";

// The setting of the routes.
// Each one contains the options CRUD and validate schema to validate
// the input of the user.

export const usersOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.USER_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.USERS_TABLE_NAME} as us`,
    tableID: `us.${TABLES_DATA.USERS_TABLE_ID}`,
    fieldNamesQuery: `us.user_id,us.username,us.role,pr.email`,
    querySelectLogic: `JOIN ${TABLES_DATA.PROFILES_TABLE_NAME} as pr ON 
    pr.${TABLES_DATA.PROFILE_ID}=us.${TABLES_DATA.PROFILE_ID}`,
  },

  permissions: PERMISSION_ADMIN,
};

export const alertsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.ALERT_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.ALERTS_TABLE_NAME} as ale`,
    tableID: `ale.${TABLES_DATA.ALERTS_TABLE_ID}`,
    fieldNamesQuery: `*`,
    querySelectLogic: ``,
    queryParams: {
      userID: "user_id",
    },
  },
  permissions: PERMISSION_TRAINEE_WITHOUT_UPDATE,
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
      secName: "last_name",
    },
    queryParams: {
      userID: "user_id",
    },
    orderByParam: {
      leadDate: "lead_date",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID,

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
    queryParams: {
      userID: "user_id",
      muscles_group_id: "muscles_group_id",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID_READ_ALL,
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
    queryParams: {
      userID: "user_id",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID_READ_ALL,
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
      secName: "city_name",
    },
    queryParams: {
      userID: "lo.user_id",
      id: "location_id",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID,
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
    queryParams: {
      userID: "pro.user_id",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID,
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
  permissions: PERMISSION_TRAINEE,
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
    queryParams: {
      userID: "ex.user_id",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID,
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
    queryParams: {
      userID: "eq.user_id",
      id: "equipment_id",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID,
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
    queryParams: {
      id: "exercise_id",
      userID: "exer.user_id",
      trainerUserID: "exer.user_id",
    },
  },
  permissions: PERMISSION_TRAINEE_READONLY,
  validateSchema: exercisesListSchema,
};

export const trainingProgramsListOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.TRAINING_PROGRAMS_LIST_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.TRAINING_PROGRAMS_LIST_TABLE_NAME} as trpl`,
    tableID: `trpl.${TABLES_DATA.TRAINING_PROGRAMS_LIST_ID}`,
    fieldNamesQuery: `trpl.*`,
    querySelectLogic: "",

    queryParams: {
      traineeID: `${TABLES_DATA.TRAINEE_ID}`,
    },
    queryNameParam: {
      programType: "program_type",
    },
    orderByParam: { updateDate: "update_date" },
  },
  permissions: PERMISSION_TRAINEE_READONLY,
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
    queryNameParam: {
      mainName: "exercise_name",
    },
    modifiedOtherTable: {
      update: {
        otherTableName: TABLES_DATA.TRAINING_PROGRAMS_LIST_TABLE_NAME,
        otherTableID: TABLES_DATA.TRAINING_PROGRAMS_LIST_ID,
        values: ["update_date"],
        include: ["update_date"],
      },
    },
  },
  permissions: PERMISSION_TRAINEE_WITHOUT_DELETE_CREATE,
  validateSchema: trainingProgramSchema,
};

export const trainingProgramsExerciseStatsOptionsCRUD: OptionsCRUD = {
  singleEntityName: "",
  selectQuery: {
    tableName: `${TABLES_DATA.TRAINING_PROGRAM_EXERCISES_STATS_TABLE_NAME} as tpes`,
    tableID: `tpes.${TABLES_DATA.TRAINING_PROGRAM_EXERCISES_STATS_ID}`,
    fieldNamesQuery: `tpes.*`,
    querySelectLogic: ``,
    queryParams: {
      exerciseID: TABLES_DATA.TRAINING_PROGRAM_ID,
      gt: "gt",
      lt: "lt",
    },
    comparisonQuery: { gt: "update_date", lt: "update_date" },
  },

  permissions: PERMISSION_TRAINEE_WITHOUT_DELETE_CREATE,
  validateSchema: trainingProgramExerciseStatsSchema,
};

export const measuresOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.MEASURES_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.MEASURES_TABLE_NAME} as mes`,
    tableID: `mes.${TABLES_DATA.MEASURE_ID}`,
    fieldNamesQuery: `mes.*`,
    querySelectLogic: `LEFT JOIN ${TABLES_DATA.PROFILES_TABLE_NAME} as pr on 
 mes.${TABLES_DATA.PROFILE_ID}=pr.${TABLES_DATA.PROFILE_ID}`,
    queryParams: {
      caloriesPie: "caloriesPie",
      profileID: "pr.profile_id",
    },
  },
  permissions: PERMISSION_TRAINEE_BY_USER_ID,
  validateSchema: measuresSchema,
};

export const nutritionProgramOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.NUTRITION_PROGRAMS_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.NUTRITION_PROGRAM_TABLE_NAME} as np`,
    tableID: `np.${TABLES_DATA.NUTRITION_PROGRAM_ID}`,
    fieldNamesQuery: `*`,
    querySelectLogic: ``,
  },
  permissions: PERMISSION_TRAINEE_WITHOUT_DELETE_CREATE,
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
  permissions: PERMISSION_TRAINEE_READONLY,
  validateSchema: nutritionProgramsListSchema,
};

export const subscriptionPlansOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.SUBSCRIPTION_PLANS_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.SUBSCRIPTION_PLANS_TABLE_NAME} as subp`,
    tableID: `subp.${TABLES_DATA.SUBSCRIPTION_PLANS_TABLE_ID}`,
    fieldNamesQuery: `subp.*,pro.product_name`,
    querySelectLogic: `LEFT JOIN ${TABLES_DATA.PRODUCTS_TABLE_NAME} as pro ON
    pro.${TABLES_DATA.PRODUCT_ID}= subp.${TABLES_DATA.PRODUCT_ID}`,
    queryParams: {
      traineeID: "trainee_id",
    },
    orderByParam: {
      lastTraining: "last_training",
    },
  },
  permissions: PERMISSION_TRAINEE_WITHOUT_DELETE_CREATE,
  validateSchema: subscriptionPlansSchema,
};

export const traineesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.TRAINEES_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.TRAINEES_TABLE_NAME} as tr`,
    tableID: `tr.${TABLES_DATA.TRAINEE_ID}`,
    fieldNamesQuery: `
    tr.trainee_id,tr.user_id,tr.trainer_user_id,
    pr.*, 
    lo.street ,
     c.city_name,
     us.username`,
    querySelectLogic: `
    LEFT JOIN ${TABLES_DATA.PROFILES_TABLE_NAME} as pr ON 
    tr.${TABLES_DATA.PROFILE_ID}=pr.${TABLES_DATA.PROFILE_ID}
    LEFT JOIN ${TABLES_DATA.LOCATION_TABLE_NAME} as lo ON 
    pr.${TABLES_DATA.LOCATION_ID}=lo.${TABLES_DATA.LOCATION_ID}
     LEFT JOIN ${TABLES_DATA.CITIES_TABLE_NAME} as c on 
   c.${TABLES_DATA.CITY_ID}=lo.${TABLES_DATA.CITY_ID} 
   LEFT JOIN ${TABLES_DATA.USERS_TABLE_NAME} as us on 
   tr.${TABLES_DATA.USERS_TABLE_ID}=us.${TABLES_DATA.USERS_TABLE_ID}`,
    queryNameParam: {
      mainName: "first_name",
      secName: "last_name",
    },

    queryParams: {
      trainerUserID: "tr.trainer_user_id",
    },

    modifiedOtherTable: {
      update: {
        otherTableName: TABLES_DATA.PROFILES_TABLE_NAME,
        otherTableID: "profile_id",
        values: [
          "first_name",
          "last_name",
          "gender",
          "identify_num",
          "birthday",
          "email",
          "phone_number",
          "location_id",
          "date_join",
          "status",
        ],
      },
    },
  },
  permissions: PERMISSION_TRAINEE_WITHOUT_DELETE_CREATE,
  validateSchema: traineesSchema,
};

export const incomesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.INCOMES_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.INCOMES_TABLE_NAME} as inc`,
    tableID: `inc.${TABLES_DATA.INCOME_ID}`,
    fieldNamesQuery: ` inc.*,profile.first_name,profile.last_name,pr.product_name`,
    querySelectLogic: `LEFT JOIN ${TABLES_DATA.TRAINEES_TABLE_NAME} as tr ON 
    tr.${TABLES_DATA.TRAINEE_ID}=inc.buyer_id
    LEFT JOIN ${TABLES_DATA.PROFILES_TABLE_NAME} as profile ON 
    profile.${TABLES_DATA.PROFILE_ID}= tr.${TABLES_DATA.PROFILE_ID} 
    LEFT  JOIN ${TABLES_DATA.PRODUCTS_TABLE_NAME} as pr ON 
    pr.${TABLES_DATA.PRODUCT_ID}= inc.${TABLES_DATA.PRODUCT_ID}
    `,
    queryParams: {
      userID: `inc.${TABLES_DATA.USERS_TABLE_ID}`,
      gt: "gt",
      lt: "lt",
    },
    comparisonQuery: {
      gt: "date",
      lt: "date",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID,
  validateSchema: incomesSchema,
};

export const productsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.PRODUCT_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.PRODUCTS_TABLE_NAME} as pro`,
    tableID: `pro.${TABLES_DATA.PRODUCT_ID}`,
    fieldNamesQuery: ` pro.*`,
    querySelectLogic: ``,
    queryParams: {
      userID: "pro.user_id",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID,
  validateSchema: productSchema,
};
