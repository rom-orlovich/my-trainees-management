DROP TABLE IF EXISTS  "participants_group" CASCADE;
DROP TABLE IF EXISTS  "schedule" CASCADE;
DROP TABLE IF EXISTS  "incomes" CASCADE;
DROP TABLE IF EXISTS  "weeks" CASCADE;
DROP TABLE IF EXISTS  "nutrition_program" CASCADE;
DROP TABLE IF EXISTS  "nutrition_programs_list" CASCADE;
DROP TABLE IF EXISTS  "training_program" CASCADE;
DROP TABLE IF EXISTS  "training_programs_list" CASCADE;
DROP TABLE IF EXISTS  "profiles" CASCADE;
DROP TABLE IF EXISTS  "subscription_plans" CASCADE;
DROP TABLE IF EXISTS  "users" CASCADE;
DROP TABLE IF EXISTS  "exercises_list" CASCADE;
DROP TABLE IF EXISTS  "equipments" CASCADE;
DROP TABLE IF EXISTS  "expenses" CASCADE;
DROP TABLE IF EXISTS  "providers" CASCADE;
DROP TABLE IF EXISTS  "locations" CASCADE;
DROP TABLE IF EXISTS  "cities" CASCADE;
DROP TABLE IF EXISTS  "activities" CASCADE;
DROP TABLE IF EXISTS  "leads" CASCADE;
DROP TABLE IF EXISTS  "notes" CASCADE;
DROP TABLE IF EXISTS  "muscles_group" CASCADE;




CREATE TABLE IF NOT EXISTS "muscles_group" (
  "muscles_group_id" serial PRIMARY KEY ,
  "muscles_group_name" VARCHAR(20) UNIQUE NOT NULL
);


CREATE TABLE IF NOT EXISTS "notes" (
  "note_id" serial PRIMARY KEY,
  "name_topic" TEXT NOT NULL,
  "note_text" TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "leads"(
"lead_id"  serial PRIMARY KEY,
"date_lead" DATE NOT NULL,
"first_name" VARCHAR(40) NOT NULL,
"last_name" VARCHAR(40) NOT NULL,
"phone_number" VARCHAR(12) NOT NULL,
"email" VARCHAR(255) DEFAULT NULL,
"status"  BOOLEAN  DEFAULT FALSE,
"note_id" INTEGER DEFAULT NULL,
    CONSTRAINT fk_note_id
      FOREIGN KEY(note_id) 
      REFERENCES notes(note_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS "activities" (
  "activity_id" serial PRIMARY KEY,
  "activity_name" VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "cities" (
  "city_id" serial PRIMARY KEY,
  "city_name" VARCHAR(255) UNIQUE NOT NULL,
  "district" VARCHAR(255) DEFAULT NULL,
  "population" INTEGER DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "locations" (
  "location_id" serial PRIMARY KEY,
  "city_id" INTEGER NOT NULL,
  "street" VARCHAR(255) DEFAULT NULL,
   CONSTRAINT fk_city_id
      FOREIGN KEY(city_id) 
      REFERENCES cities(city_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS "providers" (
  "provider_id" serial PRIMARY KEY ,
  "provider_name" VARCHAR(255) UNIQUE NOT NULL,
  "location_id" INTEGER NOT NULL,

  CONSTRAINT fk_location_id
      FOREIGN KEY(location_id) 
      REFERENCES locations(location_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);







CREATE TABLE IF NOT EXISTS "expenses" (
  "expense_id" serial PRIMARY KEY,
  "date" DATE NOT NULL,
  "seller_id" INTEGER NOT NULL,
  "expenses_amount" float NOT NULL,
  "note_id" INTEGER DEFAULT NULL,

  CONSTRAINT fk_seller_id
      FOREIGN KEY(seller_id) 
      REFERENCES providers(provider_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,

     CONSTRAINT fk_note_id
      FOREIGN KEY(note_id) 
      REFERENCES notes(note_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS "equipments" (
  "equipment_id" serial PRIMARY KEY,
  "equipment_name" VARCHAR(255) UNIQUE NOT NULL,
  "brand" VARCHAR(255) NOT NULL,
  "manufacture_year" INTEGER NOT NULL,
  "expense_id" INTEGER DEFAULT NULL ,
       CONSTRAINT fk_expense_id
      FOREIGN KEY(expense_id) 
      REFERENCES expenses(expense_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);







CREATE TABLE IF NOT EXISTS "exercises_list" (
  "exercise_id" serial PRIMARY KEY,
  "exercise_name" VARCHAR(50)  NOT NULL,
  "muscles_group_id" INTEGER NOT NULL,
  "equipment_id" INTEGER DEFAULT NULL,
      CONSTRAINT fk_muscles_group_id
      FOREIGN KEY(muscles_group_id) 
      REFERENCES muscles_group(muscles_group_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,
     
       CONSTRAINT fk_equipment_id
      FOREIGN KEY(equipment_id) 
      REFERENCES equipments(equipment_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);




CREATE TABLE IF NOT EXISTS "profiles" (
  "profile_id" serial PRIMARY KEY,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL,
  "gender" VARCHAR (20) NOT NULL,
  "identify_num" VARCHAR(15) UNIQUE NOT NULL ,
  "birthday" DATE NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "phone_number" VARCHAR(12) NOT NULL,
  "location_id" INTEGER NOT NULL,
  "date_join" DATE NOT NULL,
  "status" BOOLEAN DEFAULT FALSE,
 



  CONSTRAINT fk_location_id
      FOREIGN KEY(location_id) 
      REFERENCES locations(location_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS "subscription_plans"(
"subscription_plan_id" serial PRIMARY KEY,
"profile_id" INTEGER NOT NULL,
"plan_name" VARCHAR(50) NOT NULL,
"current_num_trainings" integer NOT NULL,
"total_trainings" integer NOT NULL,
"last_training" date DEFAULT NULL,



CONSTRAINT fk_profile_id 
    FOREIGN KEY(profile_id)
    REFERENCES profiles(profile_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS "users"(
    "user_id" serial PRIMARY KEY,
    "role" varchar(50) DEFAULT 'trainee',
    "username" varchar(50) UNIQUE,
    "password" varchar(255),
    "profile_id" INTEGER DEFAULT NULL,
CONSTRAINT "role" CHECK ("role" IN ('trainee','admin')),
CONSTRAINT fk_profile_id 
    FOREIGN KEY(profile_id)
    REFERENCES profiles(profile_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
) ;





CREATE TABLE IF NOT EXISTS "training_programs_list"(
  "training_programs_list_id" serial PRIMARY KEY,
  "profile_id" INTEGER ,
    "type_program" VARCHAR(20) , 
     "date_start" DATE NOT NULL,
     "date_end" DATE DEFAULT NULL,
     "note_id" INTEGER DEFAULT NULL,
     
CONSTRAINT "date_end" CHECK ("date_end">"date_start"),
       CONSTRAINT fk_note_id
      FOREIGN KEY(note_id) 
      REFERENCES notes(note_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,


          CONSTRAINT fk_profile_id
      FOREIGN KEY(profile_id) 
      REFERENCES profiles(profile_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE

   
);
CREATE TABLE IF NOT EXISTS "nutrition_programs_list"(
  "nutrition_programs_list_id"  serial PRIMARY KEY,
   "profile_id" INTEGER ,
    "type_program" VARCHAR(20) , 
     "date_start" DATE NOT NULL,
     "date_end" DATE DEFAULT NULL ,
    "note_id" INTEGER DEFAULT NULL,
      CONSTRAINT fk_profile_id
      FOREIGN KEY(profile_id) 
      REFERENCES profiles(profile_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,

CONSTRAINT "date_end" CHECK ("date_end">"date_start"),

          CONSTRAINT fk_note_id
      FOREIGN KEY(note_id) 
      REFERENCES notes(note_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE



);




CREATE TABLE IF NOT EXISTS "training_program"(
  "training_program_row_id" serial PRIMARY KEY,
  "training_programs_list_id" INTEGER,
  "exercise_id" INTEGER NOT NULL,
  "reps" VARCHAR(55) NOT NULL,
  "sets" INTEGER NOT NULL,
  "rest" VARCHAR NOT NULL,
  "intensity" VARCHAR (50) NOT NULL ,
  "rpe" INTEGER NOT NULL,
  "note_id" INTEGER DEFAULT NULL,
      CONSTRAINT fk_training_programs_list_id
      FOREIGN KEY(training_programs_list_id) 
      REFERENCES training_programs_list(training_programs_list_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,
      
        CONSTRAINT fk_exercise_id
      FOREIGN KEY(exercise_id) 
      REFERENCES exercises_list(exercise_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,
      
       CONSTRAINT fk_note_id
      FOREIGN KEY(note_id) 
      REFERENCES notes(note_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE

     
);





CREATE TABLE IF NOT EXISTS "nutrition_program" (
  "nutrition_program_id" serial PRIMARY KEY,
  "nutrition_programs_list_id" INTEGER NOT NULL,
  "note_id" INTEGER DEFAULT NULL,
 
  CONSTRAINT fk_nutrition_programs_list_id
      FOREIGN KEY(nutrition_programs_list_id) 
      REFERENCES nutrition_programs_list(nutrition_programs_list_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,

          CONSTRAINT fk_note_id
      FOREIGN KEY(note_id) 
      REFERENCES notes(note_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS "weeks" (
  "week_id" serial PRIMARY KEY,
  "nutrition_program_id" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "day" INTEGER NOT NULL, 
  "weight" float DEFAULT NULL ,
      CONSTRAINT fk_nutrition_program_id
      FOREIGN KEY(nutrition_program_id) 
      REFERENCES nutrition_program(nutrition_program_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);









CREATE TABLE IF NOT EXISTS "incomes" (
  "income_id" serial PRIMARY KEY,
  "income_name" VARCHAR(255) NOT NULL,
  "date" DATE NOT NULL,
  "buyer_id" INTEGER NOT NULL,
  "incomes_amount" float NOT NULL,
  "note_id" INTEGER ,


   CONSTRAINT fk_note_id
      FOREIGN KEY(note_id) 
      REFERENCES notes(note_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,
        CONSTRAINT fk_profile_id
      FOREIGN KEY(buyer_id) 
      REFERENCES profiles(profile_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);







 CREATE TABLE IF NOT EXISTS "schedule" (
  "schedule_id" serial PRIMARY KEY,
  "activity_id" INTEGER NOT NULL,
  "date_start" DATE NOT NULL,
  "date_end" DATE NOT NULL,
  "location_id" INTEGER DEFAULT NULL,
  "note_id" INTEGER DEFAULT NULL,

CONSTRAINT "date_end" check (date_end>date_start),


   CONSTRAINT fk_activity_id
      FOREIGN KEY(activity_id) 
      REFERENCES activities(activity_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,

  CONSTRAINT fk_location_id
      FOREIGN KEY(location_id) 
      REFERENCES locations(location_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,

       CONSTRAINT fk_note_id
      FOREIGN KEY(note_id) 
      REFERENCES notes(note_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE



);


CREATE TABLE IF NOT EXISTS "participants_group" (
  "participant_groupe_id" serial PRIMARY KEY,
  "schedule_id" INTEGER NOT NULL,
  "profiles_id" INTEGER NOT NULL,

   CONSTRAINT fk_schedule_id
      FOREIGN KEY(schedule_id) 
      REFERENCES schedule(schedule_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,

     CONSTRAINT fk_profile_id
      FOREIGN KEY(profiles_id) 
      REFERENCES profiles(profile_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
);