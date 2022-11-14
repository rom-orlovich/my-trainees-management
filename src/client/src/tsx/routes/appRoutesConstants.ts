/* eslint-disable no-unused-vars */
export enum APP_ROUTE {
  HOME_PAGE = "",

  SIGN_UP = "signUp",
  EMAIL_VERIFY_ROUTE = "email/verify",
  SIGN_UP_TRAINEE = "signUp/trainee/:id",
  CHANGE_USER_CRED_ROUTE = `users/:id/credentials/change`,
  LOGIN_ROUTE = "login",
  LOGOUT_ROUTE = "logout",
  USERS_ROUTE = "users",

  COMING_SOON = "comingSoon",

  TRAINEES_ROUTE = "trainees",
  TRAINEES_ROUTE_ADD = "addNewTrainee",

  TRAINING_PROGRAMS_LIST_ROUTE = "trainingProgramsList",
  TRAINING_PROGRAMS_LIST_EDIT = "editTrainingProgramList",
  TRAINING_PROGRAMS_LIST_ADD = "addNewTrainingProgramList",

  TRAINING_PROGRAMS_EXERCISES_ROUTE = "trainingProgramsExercises",
  TRAINING_PROGRAMS_EXERCISE_ADD = "addNewTrainingProgramExercise",

  EXERCISES_LIST_ROUTE = "exercisesList",
  EXERCISE_ADD = "addNewExercise",
  EXERCISE_EDIT = "editExercise",
  MEASURES_ROUTE = "measuresList",
  MEASURE_ADD = "addNewMeasures",
  MEASURE_EDIT = "editMeasures",

  EQUIPMENTS_LIST_ROUTE = "equipmentsList",
  EQUIPMENT_ADD = "addNewEquipmentList",
  EQUIPMENT_EDIT = "editEquipmentList",

  MUSCLES_GROUP_LIST_ROUTE = "musclesGroupList",
  MUSCLES_GROUP_ADD = "addNewMusclesGroupList",
  MUSCLES_GROUP_EDIT = "editMusclesGroupList",

  LEADS_ROUTE = "leads",
  LEADS_ROUTE_ADD = "addNewLead",

  LOCATION_ROUTE = "locations",
  LOCATION_ROUTE_ADD = "addNewLocation",
  LOCATION_ROUTE_EDIT = "editNewLocation",

  CITY_ROUTE_ADD = "addNewCity",
  CITY_ROUTE = "cities",

  NOTES_ROUTE = "notes",
  NOTES_ROUTE_EDIT = "editNotes",
  NOTES_ROUTE_ADD = "addNotes",

  SETTINGS_ROUTE = "settings",
  PROFILE_ROUTE = "profile",
  STATS_ROUTE = "stats",
  TRAINEES_STATS_ROUTE = "trainees",
  LEADS_STATS_ROUTE = "leads",

  MY_WORKOUTS_ROUTE = "myWorkouts",
  MY_WORKOUTS_ROUTE_EXERCISES = "myWorkoutsExercises",

  SUBSCRIPTION_PLANS_ROUTE = "subscriptionPlans",
  SUBSCRIPTION_PLANS_ROUTE_ADD = "addSubscriptionPlans",
  SUBSCRIPTION_PLANS_ROUTE_EDIT = "editSubscriptionPlans",
  FINANCES_ROUTE = "finances",

  EXPENSES_ROUTE = "expenses",
  EXPENSES_ADD = "addExpenses",
  INCOMES_ROUTE = "incomes",
  INCOMES_ADD = "addIncome",
  PRODUCTS_ROUTE = "products",
  PRODUCTS_ADD = "addProduct",

  SCHEDULE_ROUTE = "schedule",
  ACTIVITIES_ROUTE = "activities",
  ACTIVITIES_ROUTE_ADD = "addActivitY",
  PARTICIPANTS_GROUP_ROUTE = "participantsGroup",
  PARTICIPANTS_GROUP_ROUTE_ADD = "addParticipants",
  PARTICIPANTS_GROUPS_LIST_ROUTE = "participantsGroupsList",
  PARTICIPANTS_GROUPS_LIST_ROUTE_ADD = "addParticipantsGroupList",
}
