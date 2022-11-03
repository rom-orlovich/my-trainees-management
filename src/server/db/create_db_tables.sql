DROP TABLE IF EXISTS "participants_group" CASCADE;

DROP TABLE IF EXISTS "meetings" CASCADE;

DROP TABLE IF EXISTS "incomes" CASCADE;

DROP TABLE IF EXISTS "nutrition_program" CASCADE;

DROP TABLE IF EXISTS "nutrition_programs_list" CASCADE;

DROP TABLE IF EXISTS "training_program" CASCADE;

DROP TABLE IF EXISTS "training_programs_list" CASCADE;

DROP TABLE IF EXISTS "trainees" CASCADE;

DROP TABLE IF EXISTS "subscription_plans" CASCADE;

DROP TABLE IF EXISTS "users" CASCADE;

DROP TABLE IF EXISTS "exercises_list" CASCADE;

DROP TABLE IF EXISTS "equipments" CASCADE;

DROP TABLE IF EXISTS "expenses" CASCADE;

DROP TABLE IF EXISTS "providers" CASCADE;

DROP TABLE IF EXISTS "locations" CASCADE;

DROP TABLE IF EXISTS "cities" CASCADE;

DROP TABLE IF EXISTS "activities" CASCADE;

DROP TABLE IF EXISTS "leads" CASCADE;

DROP TABLE IF EXISTS "muscles_group" CASCADE;

DROP TABLE IF EXISTS "profiles" CASCADE;

DROP TABLE IF EXISTS "alerts" CASCADE;

DROP TABLE IF EXISTS "training_program_exercises_stats" CASCADE;

DROP TABLE IF EXISTS "measures" CASCADE;

DROP TABLE IF EXISTS "paticipants_groups_list" CASCADE;

CREATE TABLE IF NOT EXISTS "cities" (
  "city_id" serial PRIMARY KEY,
  "city_name" VARCHAR(255) UNIQUE NOT NULL,
  "district" VARCHAR(255),
  "population" INTEGER,
  "user_id" integer DEFAULT 1
);

CREATE TABLE IF NOT EXISTS "profiles" (
  "profile_id" serial PRIMARY KEY,
  "first_name" VARCHAR(255),
  "last_name" VARCHAR(255),
  "gender" VARCHAR (20),
  "identify_num" INTEGER,
  "birthday" DATE,
  "email" VARCHAR(255) UNIQUE,
  "phone_number" VARCHAR(12),
  "location_id" INTEGER,
  "date_join" DATE,
  "status" BOOLEAN DEFAULT FALSE,
  "measure_id" INTEGER
);

CREATE TABLE IF NOT EXISTS "measures"(
  "measure_id" serial PRIMARY KEY,
  "profile_id" INTEGER,
  "date" DATE,
  "weight" FLOAT,
  "height" FLOAT,
  "fat_percents" FLOAT,
  "activity_factor" INTEGER,
  "protein_per_kg" FLOAT,
  "fat_per_kg" FLOAT,
  "protein_g" FLOAT,
  "fat_g" FLOAT,
  "crabs_g" FLOAT,
  "protein_cals" FLOAT,
  "fat_cals" FLOAT,
  "crabs_cals" FLOAT,
  "fixed_cals" FLOAT,
  "calories_total" FLOAT,
  CONSTRAINT fk_profile_id FOREIGN KEY(profile_id) REFERENCES profiles(profile_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "users"(
  "user_id" serial PRIMARY KEY,
  "role" varchar(50) DEFAULT 'admin',
  "username" varchar(50) UNIQUE,
  "password" varchar(255),
  "refresh_tokens" TEXT [ ] DEFAULT '{}',
  "verify_token" TEXT,
  "profile_id" INTEGER,
  CONSTRAINT "role" CHECK ("role" IN ('trainee', 'admin', 'trainer')),
  CONSTRAINT fk_profile_id FOREIGN KEY(profile_id) REFERENCES profiles(profile_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

ALTER TABLE
  "cities"
add
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
SET
  NULL ON
UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "locations" (
  "location_id" serial PRIMARY KEY,
  "city_id" INTEGER NOT NULL,
  "street" VARCHAR(255),
  "user_id" integer DEFAULT 1,
  CONSTRAINT fk_city_id FOREIGN KEY(city_id) REFERENCES cities(city_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

--Constraint of fk_location_id should be after the creation of table locations;
ALTER TABLE
  "profiles"
add
  CONSTRAINT fk_location_id FOREIGN KEY(location_id) REFERENCES locations(location_id) ON DELETE
SET
  NULL ON
UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "alerts"(
  "alert_id" serial PRIMARY KEY,
  "alert_date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "alert_message" VARCHAR(255),
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "muscles_group" (
  "muscles_group_id" serial PRIMARY KEY,
  "muscles_group_name" VARCHAR(20) UNIQUE NOT NULL,
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "leads"(
  "lead_id" serial PRIMARY KEY,
  "lead_date" DATE NOT NULL,
  "first_name" VARCHAR(40) NOT NULL,
  "last_name" VARCHAR(40) NOT NULL,
  "phone_number" VARCHAR(12) NOT NULL,
  "email" VARCHAR(255),
  "status" BOOLEAN DEFAULT FALSE,
  "note_topic" TEXT NOT NULL,
  "note_text" TEXT,
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "providers" (
  "provider_id" serial PRIMARY KEY,
  "provider_name" VARCHAR(255) NOT NULL,
  "location_id" INTEGER NOT NULL,
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT fk_location_id FOREIGN KEY(location_id) REFERENCES locations(location_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "equipments" (
  "equipment_id" serial PRIMARY KEY,
  "equipment_name" VARCHAR(255) NOT NULL,
  "brand" VARCHAR(255) NOT NULL,
  "manufacture_year" INTEGER NOT NULL,
  "expense_id" INTEGER,
  "user_id" INTEGER DEFAULT 1,
  -- CONSTRAINT fk_expense_id FOREIGN KEY(expense_id) REFERENCES expenses(expense_id) ON DELETE
  -- SET
  --   NULL ON
  -- UPDATE CASCADE,
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "exercises_list" (
  "exercise_id" serial PRIMARY KEY,
  "exercise_name" VARCHAR(50) NOT NULL,
  "muscles_group_id" INTEGER NOT NULL,
  "equipment_id" INTEGER,
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT fk_muscles_group_id FOREIGN KEY(muscles_group_id) REFERENCES muscles_group(muscles_group_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_equipment_id FOREIGN KEY(equipment_id) REFERENCES equipments(equipment_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "trainees" (
  "trainee_id" serial PRIMARY KEY,
  "trainer_user_id" INTEGER DEFAULT 1,
  "user_id" INTEGER,
  "profile_id" INTEGER,
  "sign_up_token" TEXT,
  CONSTRAINT fk_trainer_user_id FOREIGN KEY(trainer_user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON
  UPDATE CASCADE,
    CONSTRAINT fk_profile_id FOREIGN KEY(profile_id) REFERENCES profiles(profile_id) ON DELETE CASCADE ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "training_programs_list"(
  "training_programs_list_id" serial PRIMARY KEY,
  "trainee_id" INTEGER,
  "program_type" VARCHAR(20),
  "update_date" DATE,
  "date_start" DATE NOT NULL,
  "date_end" DATE,
  "note_topic" TEXT,
  "note_text" TEXT,
  CONSTRAINT "date_end" CHECK ("date_end" > "date_start"),
  CONSTRAINT fk_trainee_id FOREIGN KEY(trainee_id) REFERENCES trainees(trainee_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "nutrition_programs_list"(
  "nutrition_programs_list_id" serial PRIMARY KEY,
  "trainee_id" INTEGER,
  "program_type" VARCHAR(20),
  "date_start" DATE NOT NULL,
  "date_end" DATE,
  "note_topic" TEXT,
  "note_text" TEXT,
  CONSTRAINT fk_trainee_id FOREIGN KEY(trainee_id) REFERENCES trainees(trainee_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT "date_end" CHECK ("date_end" > "date_start")
);

CREATE TABLE IF NOT EXISTS "training_program"(
  "training_program_row_id" serial PRIMARY KEY,
  "update_date" DATE,
  "training_programs_list_id" INTEGER,
  "exercise_id" INTEGER,
  "reps" VARCHAR(55) NOT NULL,
  "sets" INTEGER NOT NULL,
  "rest" VARCHAR NOT NULL,
  "intensity" VARCHAR (50) NOT NULL,
  "rpe" INTEGER NOT NULL,
  "note_topic" TEXT,
  "note_text" TEXT,
  CONSTRAINT "reps" CHECK (
    "reps" IN ('1', '3-5', '6-8', '8-10', '10-12', '12-15')
  ),
  CONSTRAINT "rpe" CHECK (
    0 < "rpe"
    AND "rpe" <= 10
  ),
  CONSTRAINT fk_training_programs_list_id FOREIGN KEY(training_programs_list_id) REFERENCES training_programs_list(training_programs_list_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_exercise_id FOREIGN KEY(exercise_id) REFERENCES exercises_list(exercise_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "training_program_exercises_stats" (
  "training_program_exercises_stats_id" serial PRIMARY KEY,
  "update_date" DATE,
  "training_program_row_id" INTEGER,
  "exercise_id" INTEGER,
  "reps" VARCHAR(55) NOT NULL,
  "sets" INTEGER NOT NULL,
  "rest" FLOAT NOT NULL,
  "intensity" FLOAT NOT NULL,
  "rpe" INTEGER NOT NULL,
  CONSTRAINT "reps" CHECK (
    "reps" IN ('1', '3-5', '6-8', '8-10', '10-12', '12-15')
  ),
  CONSTRAINT "rpe" CHECK (
    0 < "rpe"
    AND "rpe" <= 10
  ),
  CONSTRAINT fk_exercise_id FOREIGN KEY(exercise_id) REFERENCES exercises_list(exercise_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_training_program_row_id FOREIGN KEY(training_program_row_id) REFERENCES training_program(training_program_row_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "nutrition_program" (
  "nutrition_program_id" serial PRIMARY KEY,
  "nutrition_programs_list_id" INTEGER NOT NULL,
  "note_topic" TEXT,
  "note_text" TEXT,
  CONSTRAINT fk_nutrition_programs_list_id FOREIGN KEY(nutrition_programs_list_id) REFERENCES nutrition_programs_list(nutrition_programs_list_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "products"(
  "product_id" SERIAL PRIMARY KEY,
  "product_name" VARCHAR(50),
  "product_type" VARCHAR(50),
  "max_training" INTEGER,
  "price" FLOAT,
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT "product_type" CHECK (
    "product_type" IN (
      'Subscription Plan',
      'Nutrition Plan',
      'Expense',
      'Other'
    )
  ),
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "subscription_plans"(
  "subscription_plan_id" serial PRIMARY KEY,
  "product_id" INTEGER,
  "trainee_id" INTEGER NOT NULL,
  "current_num_trainings" INTEGER DEFAULT 0,
  "total_trainings" integer NOT NULL,
  "last_training" date,
  CONSTRAINT "current_num_trainings" CHECK ("current_num_trainings" <= "total_trainings"),
  CONSTRAINT fk_trainee_id FOREIGN KEY(trainee_id) REFERENCES trainees(trainee_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(product_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "incomes" (
  "income_id" serial PRIMARY KEY,
  "date" DATE NOT NULL,
  "amount" INTEGER DEFAULT 1,
  "product_id" INTEGER,
  "buyer_id" INTEGER NOT NULL,
  "total_price" FLOAT NOT NULL,
  "note_topic" TEXT,
  "note_text" TEXT,
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(product_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_trainee_id FOREIGN KEY(buyer_id) REFERENCES trainees(trainee_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "expenses" (
  "expense_id" serial PRIMARY KEY,
  "date" DATE NOT NULL,
  "amount" INTEGER DEFAULT 1,
  "product_id" INTEGER,
  "seller_name" VARCHAR(50) not null,
  "total_price" float NOT NULL,
  "note_topic" TEXT,
  "note_text" TEXT,
  "user_id" INTEGER DEFAULT 1,
  -- CONSTRAINT fk_seller_id FOREIGN KEY(seller_id) REFERENCES providers(provider_id) ON DELETE
  -- SET
  --   NULL ON
  -- UPDATE CASCADE,
  CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(product_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "activities" (
  "activity_id" serial PRIMARY KEY,
  "activity_name" VARCHAR(255) NOT NULL,
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "participants_groups_list"(
  "participants_groups_list_id" serial PRIMARY KEY,
  "group_name" VARCHAR(55),
  "public" BOOLEAN DEFAULT false,
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "participants_group" (
  "participants_group_id" serial PRIMARY KEY,
  "participants_groups_list_id" INTEGER,
  "trainee_id" INTEGER NOT NULL,
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT fk_participants_groups_list_id FOREIGN KEY(participants_groups_list_id) REFERENCES participants_groups_list(participants_groups_list_id) ON DELETE CASCADE ON
  UPDATE CASCADE,
  CONSTRAINT fk_trainee_id FOREIGN KEY(trainee_id) REFERENCES trainees(trainee_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON
  UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "meetings" (
  "meeting_id" serial PRIMARY KEY,
  "activity_id" INTEGER,
  "date_start" timestamptz NOT NULL,
  "date_end" timestamptz NOT NULL,
  "participants_groups_list_id" INTEGER,
  "location_id" INTEGER,
  "note_topic" TEXT,
  "note_text" TEXT,
  "user_id" INTEGER DEFAULT 1,
  CONSTRAINT "date_end" check (date_end > date_start),
  CONSTRAINT fk_activity_id FOREIGN KEY(activity_id) REFERENCES activities(activity_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_location_id FOREIGN KEY(location_id) REFERENCES locations(location_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE,
    CONSTRAINT fk_participants_groups_list_id FOREIGN KEY(participants_groups_list_id) REFERENCES participants_groups_list(participants_groups_list_id) ON DELETE CASCADE ON
  UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE
  SET
    NULL ON
  UPDATE CASCADE
);

-- pg_dump --column-inserts --data-only my_trainees_management  > dummy_data.sql