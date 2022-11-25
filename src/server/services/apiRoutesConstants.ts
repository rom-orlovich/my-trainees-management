/* eslint-disable no-unused-vars */
// All the endpoints and the entities names.

export enum API_ROUTES {
  API_AUTH_ROUTE = "/api/auth",
  SIGN_UP_ROUTE = "/signup",
  EMAIL_VERIFY_ROUTE = "/email/verify",
  LOGIN_ROUTE = "/login",
  REFRESH_TOKEN_ROUTE = "/token/refresh",
  REGISTER_TRAINEE_ROUTE = "/register/trainee",
  LOGOUT_ROUTE = "/logout",
  USERS_ROUTE = "/api/users",
  CHANGE_USER_CRED_ROUTE = "/credentials/change",
  RESEND_EMAIL_ROUTE = "resendEmail",
  USER_ENTITY = "user",
  ALERT_ROUTE = "/api/alerts",
  ALERT_ENTITY = "alert",

  LEADS_ROUTE = "/api/leads",
  LEADS_ENTITY = "lead",

  CITIES_ROUTE = "/api/cities",
  CITIES_ENTITY = "city",
  LOCATIONS_ROUTE = "/api/locations",
  LOCATIONS_ENTITY = "location",

  PROVIDERS_ROUTE = "/api/providers",
  PROVIDERS_ENTITY = "provider",

  MUSCLES_GROUP_ROUTE = "/api/musclesGroups",
  MUSCLES_GROUP_ENTITY = "musclesGroup",
  EQUIPMENTS_ROUTE = "/api/equipments",
  EQUIPMENTS_ENTITY = "equipment",
  EXERCISES_ROUTE = "/api/exercises",
  EXERCISES_ENTITY = "exercise",
  TRAINING_PROGRAMS_LIST_ROUTE = "/api/trainingProgramsList",
  TRAINING_PROGRAMS_LIST_ENTITY = "trainingProgramList",
  TRAINING_PROGRAMS_ROUTE = "/api/trainingPrograms",
  TRAINING_PROGRAMS_ENTITY = "exercise",
  EXERCISES_STATS_ROUTE = "/api/trainingPrograms/stats",

  NUTRITION_PROGRAMS_LIST_ROUTE = "/api/nutritionProgramsList",
  NUTRITION_PROGRAMS_LIST_ENTITY = "nutritionProgramList",
  NUTRITION_PROGRAMS_ROUTE = "/api/nutritionPrograms",
  NUTRITION_PROGRAMS_ENTITY = "week",
  MEASURES_ROUTE = "/api/measures",
  MEASURES_ENTITY = "measure",

  TRAINEES_ROUTE = "/api/trainees",
  TRAINEES_ENTITY = "trainee",
  SUBSCRIPTION_PLANS_ROUTE = "/api/subscriptionPlans",
  SUBSCRIPTION_PLANS_ENTITY = "subscription",

  MAIL_ROUTE = "/api/mail",

  INCOMES_ROUTE = "/api/incomes",
  INCOMES_ENTITY = "income",
  EXPENSES_ROUTE = "/api/expenses",
  EXPENSES_ENTITY = "expense",
  PRODUCTS_ROUTE = "/api/products",
  PRODUCT_ENTITY = "product",
  FINANCES_ROUTE = "/api/finances",
  FINANCES_ENTITY = "finance",

  ACTIVITIES_ROUTE = "/api/activities",
  ACTIVITIES_ENTITY = "activity",
  MEETINGS_ROUTE = "/api/meetings",
  MEETINGS_ENTITY = "meeting",
  PARTICIPANTS_GROUP_ROUTE = "/api/participantsGroup",
  PARTICIPANTS_GROUP_ENTITY = "participantsGroup",
  PARTICIPANTS_GROUPS_LIST_ROUTE = "/api/participantsGroupsList",
  PARTICIPANTS_GROUPS_LIST_ENTITY = "participantsGroupsList",
}

export const URL_REACT_CLIENT = "http://localhost:3000";
export const URL_HEROKU_CLIENT =
  "https://my-trainees-management-v3.onrender.com";

export const URL_CUR_CLIENT =
  process.env.NODE_ENV === "development" ? URL_REACT_CLIENT : URL_HEROKU_CLIENT;
