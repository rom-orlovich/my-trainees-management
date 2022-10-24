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
  USER_ENTITY = "user",
  ALERT_ROUTE = "/api/alerts",
  ALERT_ENTITY = "alert",
  LEADS_ROUTE = "/api/leads",
  LEADS_ENTITY = "lead",
  MUSCLES_GROUP_ROUTE = "/api/musclesGroups",
  MUSCLES_GROUP_ENTITY = "musclesGroup",
  CITIES_ROUTE = "/api/cities",
  CITIES_ENTITY = "city",
  LOCATIONS_ROUTE = "/api/locations",
  LOCATIONS_ENTITY = "location",
  PROVIDERS_ROUTE = "/api/providers",
  PROVIDERS_ENTITY = "provider",
  WEEKS_ROUTE = "/api/weeks",
  WEEKS_ENTITY = "week",
  EXPENSES_ROUTE = "/api/expenses",
  EXPENSES_ENTITY = "expense",
  EQUIPMENTS_ROUTE = "/api/equipments",
  EQUIPMENTS_ENTITY = "equipment",
  EXERCISES_ROUTE = "/api/exercises",
  EXERCISES_ENTITY = "exercise",
  TRAINING_PROGRAMS_LIST_ROUTE = "/api/trainingProgramsList",
  TRAINING_PROGRAMS_LIST_ENTITY = "trainingProgramList",
  TRAINING_PROGRAMS_ROUTE = "/api/trainingPrograms",
  TRAINING_PROGRAMS_ENTITY = "exercise",
  TRAINING_PROGRAMS_STATS_ROUTE = "/api/trainingPrograms/stats",

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
  INCOMES_ROUTE = "/api/incomes",
  INCOMES_ENTITY = "income",
  MAIL_ROUTE = "/api/mail",
}

export const URL_REACT_CLIENT = "http://localhost:3000";
export const URL_HEROKU_CLIENT =
  "https://my-trainee-management-new.herokuapp.com";

export const URL_CUR_CLIENT =
  process.env.NODE_ENV === "development" ? URL_REACT_CLIENT : URL_HEROKU_CLIENT;
