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

  MY_WORKOUTS = "myWorkouts",
  MY_WORKOUTS_EXERCISES = "myWorkoutsExercises",
}
