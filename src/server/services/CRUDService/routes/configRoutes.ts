/* eslint-disable no-unused-vars */

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
  nutritionMenusListSchema,
  providersSchema,
  traineesSchema,
  trainingProgramSchema,
  trainingProgramsListSchema,
  trainingProgramExerciseStatsSchema,
  measuresSchema,
  productSchema,
  activitySchema,
  participantsGroupSchema,
  meetingsSchema,
  participantsGroupListSchema,
  foodsSchema,
  nutritionMenuSchema,
  nutritionQuestionnaireSchema,
} from "../../schemas/DBSchemas";
import { TABLES_DATA } from "../../../utilities/tableDataSQL";
import { API_ROUTES } from "../../apiRoutesConstants";
import {
  PERMISSION_ADMIN,
  PERMISSION_TRAINEE_WITHOUT_UPDATE,
  PERMISSION_TRAINER_BY_USER_ID,
  PERMISSION_TRAINEE_READONLY,
  PERMISSION_TRAINEE_WITHOUT_DELETE_CREATE,
  PERMISSION_TRAINER_BY_USER_ID_READ_ALL,
  PERMISSION_TRAINEE_BY_USER_ID,
  PERMISSION_TRAINEE_READONLY_ADMIN_USER_ID,
} from "../../usersPermission";
import { OptionsCRUD } from "../CRUDServiceTypes";

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
      userID: `${TABLES_DATA.USERS_TABLE_ID}`,
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
    fieldNamesQuery: `le.*,c.city_name`,
    querySelectLogic: ` LEFT JOIN ${TABLES_DATA.LOCATION_TABLE_NAME} as lo ON 
    le.${TABLES_DATA.LOCATION_ID}=lo.${TABLES_DATA.LOCATION_ID}
     LEFT JOIN ${TABLES_DATA.CITIES_TABLE_NAME} as c on 
   c.${TABLES_DATA.CITY_ID}=lo.${TABLES_DATA.CITY_ID}`,
    queryNameParam: {
      mainName: "first_name",
      secName: "last_name",
    },
    queryParams: {
      userID: `le.${TABLES_DATA.USERS_TABLE_ID}`,
    },
    orderByParam: {
      leadDate: "lead_date",
    },

    comparisonQuery: {
      leadDate_gt: "le.lead_date",
      leadDate_lt: "le.lead_date",
      gt: "le.lead_date",
      lt: "le.lead_date",
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
      userID: `${TABLES_DATA.USERS_TABLE_ID}`,
      id: `${TABLES_DATA.MUSCLE_GROUP_ID}`,
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
      userID: `${TABLES_DATA.USERS_TABLE_ID}`,
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
      userID: `lo.${TABLES_DATA.USERS_TABLE_ID}`,
      id: `${TABLES_DATA.LOCATION_ID}`,
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
      userID: `pro.user_id`,
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID,
  validateSchema: providersSchema,
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
      userID: `eq.${TABLES_DATA.USERS_TABLE_ID}`,
      id: `${TABLES_DATA.EQUIPMENTS_ID}`,
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
      id: `${TABLES_DATA.EXERCISES_ID}`,
      userID: `exer.${TABLES_DATA.USERS_TABLE_ID}`,
      trainerUserID: `exer.${TABLES_DATA.USERS_TABLE_ID}`,
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
  permissions: PERMISSION_TRAINEE_READONLY_ADMIN_USER_ID,
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
    },

    comparisonQuery: {
      gt: "update_date",
      lt: "update_date",
    },
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
      profileID: `pr.${TABLES_DATA.PROFILE_ID}`,
    },
    comparisonQuery: {
      gt: "date",
      lt: "date",
    },
  },
  permissions: PERMISSION_TRAINEE_BY_USER_ID,
  validateSchema: measuresSchema,
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
      traineeID: `${TABLES_DATA.TRAINEE_ID}`,
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
      id: `tr.${TABLES_DATA.TRAINEE_ID}`,
    },

    comparisonQuery: {
      gt: "date_join",
      lt: "date_join",
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
      delete: {
        otherTableID: TABLES_DATA.PROFILE_ID,
        otherTableName: TABLES_DATA.PROFILES_TABLE_NAME,
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
    LEFT JOIN ${TABLES_DATA.PRODUCTS_TABLE_NAME} as pr ON 
    pr.${TABLES_DATA.PRODUCT_ID}= inc.${TABLES_DATA.PRODUCT_ID}
    `,
    queryParams: {
      userID: `inc.${TABLES_DATA.USERS_TABLE_ID}`,
    },

    comparisonQuery: {
      gt: "date",
      lt: "date",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID,
  validateSchema: incomesSchema,
};

export const expensesOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.EXPENSES_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.EXPENSES_TABLE_NAME} as ex`,
    tableID: `ex.${TABLES_DATA.EXPENSES_ID}`,
    fieldNamesQuery: `ex.*, pr.product_name`,
    querySelectLogic: ` LEFT JOIN ${TABLES_DATA.PRODUCTS_TABLE_NAME} as pr ON 
    pr.${TABLES_DATA.PRODUCT_ID}= ex.${TABLES_DATA.PRODUCT_ID}`,
    queryParams: {
      userID: `ex.${TABLES_DATA.USERS_TABLE_ID}`,
    },

    comparisonQuery: {
      gt: "date",
      lt: "date",
    },
  },

  permissions: PERMISSION_TRAINER_BY_USER_ID,
  validateSchema: expensesSchema,
};

export const financesStatsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.FINANCES_ENTITY,
  selectQuery: {
    tableName: ``,
    tableID: ``,
    fieldNamesQuery: ``,
    querySelectLogic: ``,
  },

  permissions: PERMISSION_TRAINER_BY_USER_ID,
};

export const productsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.PRODUCT_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.PRODUCTS_TABLE_NAME} as pro`,
    tableID: `pro.${TABLES_DATA.PRODUCT_ID}`,
    fieldNamesQuery: ` pro.*`,
    querySelectLogic: ``,
    queryParams: {
      userID: `pro.${TABLES_DATA.USERS_TABLE_ID}`,
      id: `pro.${TABLES_DATA.PRODUCT_ID}`,
      diffProductType: "product_type",
      productType: "product_type",
    },
  },
  permissions: PERMISSION_TRAINER_BY_USER_ID,
  validateSchema: productSchema,
};

export const activityOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.ACTIVITIES_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.ACTIVITIES_TABLE_NAME} as act`,
    tableID: `act.${TABLES_DATA.ACTIVITIES_ID}`,
    fieldNamesQuery: ` act.*`,
    querySelectLogic: ``,
    queryParams: {
      userID: `act.${TABLES_DATA.USERS_TABLE_ID}`,
      id: `act.${TABLES_DATA.ACTIVITIES_ID}`,
    },
    queryNameParam: {
      mainName: "act.activity_name",
    },
  },
  permissions: PERMISSION_TRAINEE_READONLY_ADMIN_USER_ID,
  validateSchema: activitySchema,
  logAlert: true,
};
export const participantsGroupOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.PARTICIPANTS_GROUP_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.PARTICIPANTS_GROUP_TABLE_NAME} as pgt`,
    tableID: `pgt.${TABLES_DATA.PARTICIPANTS_GROUP_ID}`,
    fieldNamesQuery: ` pgt.*,pro.first_name,pro.last_name,pro.profile_id,us.username`,
    querySelectLogic: `
    LEFT JOIN ${TABLES_DATA.TRAINEES_TABLE_NAME} AS tr 
    ON tr.${TABLES_DATA.TRAINEE_ID} = pgt.${TABLES_DATA.TRAINEE_ID}
    LEFT JOIN ${TABLES_DATA.PROFILES_TABLE_NAME} AS pro 
    ON tr.${TABLES_DATA.PROFILE_ID} = pro.${TABLES_DATA.PROFILE_ID}
    LEFT JOIN ${TABLES_DATA.USERS_TABLE_NAME} AS us on 
   tr.${TABLES_DATA.USERS_TABLE_ID}=us.${TABLES_DATA.USERS_TABLE_ID}`,
    queryParams: {
      userID: `pgt.${TABLES_DATA.USERS_TABLE_ID}`,
      trainerUserID: `pgt.${TABLES_DATA.USERS_TABLE_ID}`,
      participantsGroupsListID: `pgt.${TABLES_DATA.PARTICIPANTS_GROUPS_LIST_ID}`,
    },
  },
  permissions: PERMISSION_TRAINEE_READONLY_ADMIN_USER_ID,
  validateSchema: participantsGroupSchema,
  logAlert: true,
};
export const participantsGroupListOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.PARTICIPANTS_GROUPS_LIST_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.PARTICIPANTS_GROUPS_LIST_TABLE_NAME} as pgl`,
    tableID: `pgl.${TABLES_DATA.PARTICIPANTS_GROUPS_LIST_ID}`,
    fieldNamesQuery: `pgl.*`,
    querySelectLogic: ``,
    queryParams: {
      userID: `pgl.${TABLES_DATA.USERS_TABLE_ID}`,
      id: `pgl.${TABLES_DATA.PARTICIPANTS_GROUPS_LIST_ID}`, // For general id search
    },
    queryNameParam: {
      mainName: `pgl.group_name`,
    },
  },
  permissions: PERMISSION_TRAINEE_READONLY_ADMIN_USER_ID,
  validateSchema: participantsGroupListSchema,
  logAlert: true,
};

export const meetingOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.MEETINGS_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.MEETINGS_TABLE_NAME} as mt`,
    tableID: `mt.${TABLES_DATA.MEETINGS_ID}`,
    fieldNamesQuery: ` mt.*,act.activity_name,lo.street,c.city_name,pgl.group_name`,
    querySelectLogic: `
    LEFT JOIN ${TABLES_DATA.ACTIVITIES_TABLE_NAME} as act ON
    mt.${TABLES_DATA.ACTIVITIES_ID}= act.${TABLES_DATA.ACTIVITIES_ID}
    JOIN ${TABLES_DATA.LOCATION_TABLE_NAME} as lo ON
    mt.${TABLES_DATA.LOCATION_ID}=lo.${TABLES_DATA.LOCATION_ID}
    JOIN ${TABLES_DATA.CITIES_TABLE_NAME} as c ON
    c.${TABLES_DATA.CITY_ID}=lo.${TABLES_DATA.CITY_ID}
    LEFT JOIN ${TABLES_DATA.PARTICIPANTS_GROUPS_LIST_TABLE_NAME} as pgl ON
    mt.${TABLES_DATA.PARTICIPANTS_GROUPS_LIST_ID}= pgl.${TABLES_DATA.PARTICIPANTS_GROUPS_LIST_ID}`,
    queryParams: {
      traineeID: `pg.${TABLES_DATA.TRAINEE_ID}`,
      userID: `mt.${TABLES_DATA.USERS_TABLE_ID}`,
      trainerUserID: `mt.${TABLES_DATA.USERS_TABLE_ID}`,
    },

    comparisonQuery: {
      gt: "date_start",
      lt: "date_end",
    },
    orderByParam: {
      dateStart: "date_start",
    },
  },
  permissions: PERMISSION_TRAINEE_READONLY_ADMIN_USER_ID,
  validateSchema: meetingsSchema,
  logAlert: true,
};

export const foodsOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.FOOD_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.FOODS_TABLE_NAME} as fd`,
    tableID: `fd.${TABLES_DATA.FOODS_ID}`,
    fieldNamesQuery: `fd.*`,
    querySelectLogic: ``,
    queryParams: {
      kosher: "fd.kosher",
      kosher_type: "fd.kosher_type",
      is_vegan: "fd.is_vegan",
      is_vegetarian: "fd.is_vegetarian",
      nutrient_type: "fd.nutrient_type",
    },
    queryNameParam: { mainName: "food_name" },
    comparisonQuery: {
      proteinG_gt: "fd.protein_g",
      proteinG_lt: "fd.protein_g",
      caloriesTotal_gt: "fd.calories_total",
      caloriesTotal_lt: "fd.calories_total",
      carbsG_gt: "fd.carbs_g",
      carbsG_lt: "fd.carbs_g",
      sugarsG_gt: "fd.sugars_g",
      sugarsG_lt: "fd.sugars_g",
      fatG_gt: "fd.fat_g",
      fatG_lt: "fd.fat_g",
      saturatedFatG_gt: "fd.saturated_fat",
      saturatedFatG_lt: "fd.saturated_fat",
      cholesterolMg_gt: "fd.cholesterol_mg",
      cholesterolMg_lt: "fd.cholesterol_mg",
      sodiumMg_gt: "fd.sodium_mg",
      sodiumMg_lt: "fd.sodium_mg",
    },
    arrayQueryParams: {
      allergens: {
        selectQueryStr: "not fd.allergens && ",
      },
    },
  },
  permissions: PERMISSION_TRAINEE_READONLY_ADMIN_USER_ID,
  validateSchema: foodsSchema,
  logAlert: true,
};

export const nutritionMenusListOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.NUTRITION_MENUS_LIST_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.NUTRITION_MENUS_LIST_TABLE_NAME} as nml`,
    tableID: `nml.${TABLES_DATA.NUTRITION_MENUS_LIST_ID}`,
    fieldNamesQuery: `nml.*`,
    querySelectLogic: ``,
    queryNameParam: {
      mainName: "nml.note_topic",
    },
    queryParams: {
      profileID: `nml.${TABLES_DATA.PROFILE_ID}`,
    },
  },
  permissions: PERMISSION_TRAINEE_WITHOUT_DELETE_CREATE,
  validateSchema: nutritionMenusListSchema,
};
export const nutritionMenuOptionsCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.NUTRITION_MENU_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.NUTRITION_MENUS_MEALS_TABLE_NAME} as nmm`,
    tableID: `nmm.${TABLES_DATA.NUTRITION_MENUS_LIST_ID}`,
    fieldNamesQuery: `nmm.*`,
    querySelectLogic: ``,
    queryParams: {
      userID: `nml.${TABLES_DATA.USERS_TABLE_ID}`,
      profileID: `nml.${TABLES_DATA.PROFILE_ID}`,
    },
  },
  permissions: PERMISSION_TRAINEE_READONLY_ADMIN_USER_ID,
  validateSchema: nutritionMenuSchema,
};
export const nutritionQuestionnaireCRUD: OptionsCRUD = {
  singleEntityName: API_ROUTES.NUTRITION_QUESTIONNAIRE_ENTITY,
  selectQuery: {
    tableName: `${TABLES_DATA.NUTRITION_QUESTIONNAIRE_TABLE_NAME} as nq`,
    tableID: `nq.${TABLES_DATA.NUTRITION_QUESTIONNAIRE_ID}`,
    fieldNamesQuery: `nq.*`,
    querySelectLogic: ``,
    queryParams: {
      // userID: `nml.${TABLES_DATA.USERS_TABLE_ID}`,
      // profileID: `nml.${TABLES_DATA.PROFILE_ID}`,
    },
  },
  permissions: PERMISSION_TRAINEE_BY_USER_ID,
  validateSchema: nutritionQuestionnaireSchema,
};
