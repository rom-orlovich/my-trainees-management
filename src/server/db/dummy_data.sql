INSERT INTO
  public.cities (
    city_id,
    city_name,
    district,
    population,
    user_id
  )
VALUES
  (1, 'Kiryat Ono', 'center', 200000, 2);

INSERT INTO
  public.cities (
    city_id,
    city_name,
    district,
    population,
    user_id
  )
VALUES
  (2, 'Tel Aviv', 'center', 300000, 2);

INSERT INTO
  public.cities (
    city_id,
    city_name,
    district,
    population,
    user_id
  )
VALUES
  (3, 'Ramat Gan', 'center', 300000, 2);

INSERT INTO
  public.cities (
    city_id,
    city_name,
    district,
    population,
    user_id
  )
VALUES
  (4, 'Petah Tikva', 'center', 300000, 2);

INSERT INTO
  public.cities (
    city_id,
    city_name,
    district,
    population,
    user_id
  )
VALUES
  (5, 'Hod HaSharon', 'center', 200000, 2);

INSERT INTO
  public.cities (
    city_id,
    city_name,
    district,
    population,
    user_id
  )
VALUES
  (6, 'Rishon Lezion', 'center', 200000, 2);

SELECT
  pg_catalog.setval ('public.cities_city_id_seq', 7, false);

INSERT INTO
  public.locations (location_id, city_id, street, user_id)
VALUES
  (1, 1, 'Moshe Hass', 2);

INSERT INTO
  public.locations (location_id, city_id, street, user_id)
VALUES
  (2, 2, 'R.s', 2);

INSERT INTO
  public.locations (location_id, city_id, street, user_id)
VALUES
  (3, 3, 'Ben Gurion', 2);

INSERT INTO
  public.locations (location_id, city_id, street, user_id)
VALUES
  (4, 5, '1 Modiin', 2);

INSERT INTO
  public.locations (location_id, city_id, street, user_id)
VALUES
  (5, 3, '5 Metula', 2);

INSERT INTO
  public.locations (location_id, city_id, street, user_id)
VALUES
  (6, 6, ' 74 Herzl Blvd', 2);

INSERT INTO
  public.locations (location_id, city_id, street, user_id)
VALUES
  (7, 2, '39 Levinsky', 2);

INSERT INTO
  public.locations (location_id, city_id, street, user_id)
VALUES
  (8, 2, '22 Kvir St', 2);

SELECT
  pg_catalog.setval ('public.locations_location_id_seq', 9, false);

update
  profiles
set
  email = 'rom-orlovich@cyber4s.dev',
  status = true,
  date_join = '2022-10-15T21:00:00.000Z',
  location_id = 1,
  phone_number = '054-3552144',
  birthday = '2022-10-16T21:00:00.000Z',
  identify_num = 222222,
  gender = 'male',
  last_name = 'orlovich',
  first_name = 'rom'
WHERE
  profile_id = 3;

INSERT INTO
  public.profiles (
    profile_id,
    first_name,
    last_name,
    gender,
    identify_num,
    birthday,
    email,
    phone_number,
    location_id,
    date_join,
    status,
    measure_id
  )
VALUES
  (
    4,
    'Ido',
    'Gideon',
    'male',
    920213,
    '2022-10-11',
    'glind57@pickuplanet.com',
    '054-617-4272',
    7,
    '2022-10-25',
    false,
    NULL
  );

INSERT INTO
  public.profiles (
    profile_id,
    first_name,
    last_name,
    gender,
    identify_num,
    birthday,
    email,
    phone_number,
    location_id,
    date_join,
    status,
    measure_id
  )
VALUES
  (
    6,
    'Tzvi',
    'Daniela',
    'male',
    3851455,
    '2022-10-01',
    'ninchu@grecc.me',
    '055-011-9485',
    7,
    '2022-10-25',
    false,
    NULL
  );

INSERT INTO
  public.profiles (
    profile_id,
    first_name,
    last_name,
    gender,
    identify_num,
    birthday,
    email,
    phone_number,
    location_id,
    date_join,
    status,
    measure_id
  )
VALUES
  (
    5,
    'Nitza',
    'Meira',
    'female',
    488554,
    '2022-10-09',
    'czena1@chantellegribbon.com',
    '054-245-5250',
    2,
    '2022-10-25',
    false,
    NULL
  );

SELECT
  pg_catalog.setval ('public.profiles_profile_id_seq', 7, false);

INSERT INTO
  trainees (
    user_id,
    profile_id,
    trainer_user_id,
    sign_up_token
  )
VALUES
  (3, 3, 2, '');

INSERT INTO
  public.trainees (
    trainee_id,
    trainer_user_id,
    user_id,
    profile_id,
    sign_up_token
  )
VALUES
  (
    2,
    2,
    NULL,
    4,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdsaW5kNTdAcGlja3VwbGFuZXQuY29tIiwicHJvZmlsZV9pZCI6NCwidG9rZW5UeXBlIjoxLCJpYXQiOjE2NjY3MTM3MTMsImV4cCI6MTY2NjgwMDExM30.YAo3VGlDToUHDltwp5odkjxWFo4HljjzAsGVQ-vttCs'
  );

INSERT INTO
  public.trainees (
    trainee_id,
    trainer_user_id,
    user_id,
    profile_id,
    sign_up_token
  )
VALUES
  (
    4,
    2,
    NULL,
    6,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbmNodUBncmVjYy5tZSIsInByb2ZpbGVfaWQiOjYsInRva2VuVHlwZSI6MSwiaWF0IjoxNjY2NzE1MjExLCJleHAiOjE2NjY4MDE2MTF9.FTuglCoyBEuBc6HsLiHWIL0Y8z-rtwCv0aXu3ekLTrM'
  );

INSERT INTO
  public.trainees (
    trainee_id,
    trainer_user_id,
    user_id,
    profile_id,
    sign_up_token
  )
VALUES
  (
    3,
    2,
    NULL,
    5,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN6ZW5hMUBjaGFudGVsbGVncmliYm9uLmNvbSIsInByb2ZpbGVfaWQiOjUsInRva2VuVHlwZSI6MSwiaWF0IjoxNjY2NzEzNzk4LCJleHAiOjE2NjY4MDAxOTh9.Pp7EHsTmB-lAiSGjZcOzBBkgXc0FjQUgKjCvDuJvrq8'
  );

SELECT
  pg_catalog.setval ('public.trainees_trainee_id_seq', 5, false);

INSERT INTO
  public.leads (
    lead_id,
    lead_date,
    first_name,
    last_name,
    phone_number,
    email,
    status,
    note_topic,
    note_text,
    user_id
  )
VALUES
  (
    1,
    '2022-10-10',
    'Ido',
    'Gideon',
    '21223123',
    'a@b.com',
    false,
    '',
    '',
    2
  );

INSERT INTO
  public.leads (
    lead_id,
    lead_date,
    first_name,
    last_name,
    phone_number,
    email,
    status,
    note_topic,
    note_text,
    user_id
  )
VALUES
  (
    2,
    '2022-10-25',
    'Nitza',
    ' Daniela',
    '054-617-4272',
    'aaas@asd.com',
    false,
    '',
    '',
    2
  );

INSERT INTO
  public.leads (
    lead_id,
    lead_date,
    first_name,
    last_name,
    phone_number,
    email,
    status,
    note_topic,
    note_text,
    user_id
  )
VALUES
  (
    3,
    '2022-10-25',
    'Tzvi',
    'yehc',
    '21223123',
    'sasd@oads.com',
    false,
    'b',
    '',
    2
  );

INSERT INTO
  public.leads (
    lead_id,
    lead_date,
    first_name,
    last_name,
    phone_number,
    email,
    status,
    note_topic,
    note_text,
    user_id
  )
VALUES
  (
    4,
    '2022-10-25',
    'Ido',
    'asd',
    '059-960-0499',
    'olgapaveleva87@gmailwe.com',
    false,
    '',
    '',
    2
  );

INSERT INTO
  public.leads (
    lead_id,
    lead_date,
    first_name,
    last_name,
    phone_number,
    email,
    status,
    note_topic,
    note_text,
    user_id
  )
VALUES
  (
    5,
    '2022-10-24',
    'Shachar',
    ' Leah',
    '058-983-7010',
    'tequilasunrise@dogbackpack.net',
    true,
    '',
    '',
    2
  );

INSERT INTO
  public.leads (
    lead_id,
    lead_date,
    first_name,
    last_name,
    phone_number,
    email,
    status,
    note_topic,
    note_text,
    user_id
  )
VALUES
  (
    6,
    '2022-10-25',
    'Ora',
    'Uriel',
    '055-729-4430',
    'gobugayu@unair.nl',
    false,
    '',
    '',
    2
  );

SELECT
  pg_catalog.setval ('public.leads_lead_id_seq', 7, false);

INSERT INTO
  public.equipments (
    equipment_id,
    equipment_name,
    brand,
    manufacture_year,
    expense_id,
    user_id
  )
VALUES
  (1, 'Dips bar', 'none', 2020, NULL, 2);

INSERT INTO
  public.equipments (
    equipment_id,
    equipment_name,
    brand,
    manufacture_year,
    expense_id,
    user_id
  )
VALUES
  (2, 'Olympic bar', 'none', 2020, NULL, 2);

INSERT INTO
  public.equipments (
    equipment_id,
    equipment_name,
    brand,
    manufacture_year,
    expense_id,
    user_id
  )
VALUES
  (3, 'Hand weight', 'none', 2020, NULL, 2);

INSERT INTO
  public.equipments (
    equipment_id,
    equipment_name,
    brand,
    manufacture_year,
    expense_id,
    user_id
  )
VALUES
  (4, 'Training mattress', 'none', 2020, NULL, 2);

INSERT INTO
  public.equipments (
    equipment_id,
    equipment_name,
    brand,
    manufacture_year,
    expense_id,
    user_id
  )
VALUES
  (5, 'Pull ups bar', 'none', 2020, NULL, 2);

INSERT INTO
  public.equipments (
    equipment_id,
    equipment_name,
    brand,
    manufacture_year,
    expense_id,
    user_id
  )
VALUES
  (6, 'Weight Plates', 'none', 2020, NULL, 2);

SELECT
  pg_catalog.setval ('public.equipments_equipment_id_seq', 7, false);

--
-- Data for Name: muscles_group; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
  public.muscles_group (muscles_group_id, muscles_group_name, user_id)
VALUES
  (1, 'Legs', 2);

INSERT INTO
  public.muscles_group (muscles_group_id, muscles_group_name, user_id)
VALUES
  (2, 'Chest', 2);

INSERT INTO
  public.muscles_group (muscles_group_id, muscles_group_name, user_id)
VALUES
  (3, 'Back', 2);

INSERT INTO
  public.muscles_group (muscles_group_id, muscles_group_name, user_id)
VALUES
  (4, 'Triceps', 2);

INSERT INTO
  public.muscles_group (muscles_group_id, muscles_group_name, user_id)
VALUES
  (6, 'ABS', 2);

INSERT INTO
  public.muscles_group (muscles_group_id, muscles_group_name, user_id)
VALUES
  (7, 'Biceps', 2);

INSERT INTO
  public.muscles_group (muscles_group_id, muscles_group_name, user_id)
VALUES
  (5, 'Shoulders', 2);

SELECT
  pg_catalog.setval (
    'public.muscles_group_muscles_group_id_seq',
    8,
    false
  );

--
-- Data for Name: exercises_list; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (1, 'Chest Press', 2, 2, 2);

INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (4, 'Dips', 2, 1, 2);

INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (2, 'Squat', 1, 2, 2);

INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (6, 'Upper Chest Press', 2, 2, 2);

INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (7, 'Wide-Dips with weight', 2, 6, 2);

INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (8, 'Narrow-Dips with weight', 4, 1, 2);

INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (9, 'Pull Ups', 3, 6, 2);

INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (10, 'Bent Over Row', 3, 2, 2);

INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (12, 'Stiff Legs Death -Lift', 1, 2, 2);

INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (11, 'Lunge', 1, 3, 2);

INSERT INTO
  public.exercises_list (
    exercise_id,
    exercise_name,
    muscles_group_id,
    equipment_id,
    user_id
  )
VALUES
  (13, 'Pull Ups with weight', 3, 6, 2);

SELECT
  pg_catalog.setval (
    'public.exercises_list_exercise_id_seq',
    14,
    false
  );

INSERT INTO
  public.measures (
    measure_id,
    profile_id,
    date,
    weight,
    height,
    fat_percents,
    activity_factor,
    protein_per_kg,
    fat_per_kg,
    protein_g,
    fat_g,
    crabs_g,
    protein_cals,
    fat_cals,
    crabs_cals,
    fixed_cals,
    calories_total
  )
VALUES
  (
    1,
    3,
    '2022-10-24',
    70,
    165,
    NULL,
    28,
    1.8,
    0.5,
    126,
    35,
    535.25,
    504,
    315,
    2141,
    1000,
    2960
  );

INSERT INTO
  public.measures (
    measure_id,
    profile_id,
    date,
    weight,
    height,
    fat_percents,
    activity_factor,
    protein_per_kg,
    fat_per_kg,
    protein_g,
    fat_g,
    crabs_g,
    protein_cals,
    fat_cals,
    crabs_cals,
    fixed_cals,
    calories_total
  )
VALUES
  (
    2,
    4,
    '2022-10-24',
    65.3,
    150,
    NULL,
    30,
    1.6,
    0.5,
    104.48,
    32.65,
    311.81,
    417.92,
    293.85,
    1247.23,
    0,
    1959
  );

INSERT INTO
  public.measures (
    measure_id,
    profile_id,
    date,
    weight,
    height,
    fat_percents,
    activity_factor,
    protein_per_kg,
    fat_per_kg,
    protein_g,
    fat_g,
    crabs_g,
    protein_cals,
    fat_cals,
    crabs_cals,
    fixed_cals,
    calories_total
  )
VALUES
  (
    3,
    6,
    '2022-10-24',
    65,
    160,
    NULL,
    28,
    1.6,
    0.5,
    104,
    32.5,
    277.88,
    416,
    292.5,
    1111.5,
    0,
    1820
  );

INSERT INTO
  public.measures (
    measure_id,
    profile_id,
    date,
    weight,
    height,
    fat_percents,
    activity_factor,
    protein_per_kg,
    fat_per_kg,
    protein_g,
    fat_g,
    crabs_g,
    protein_cals,
    fat_cals,
    crabs_cals,
    fixed_cals,
    calories_total
  )
VALUES
  (
    4,
    5,
    '2022-10-24',
    60,
    178,
    NULL,
    28,
    1.6,
    0.5,
    96,
    30,
    256.5,
    384,
    270,
    1026,
    0,
    1680
  );

SELECT
  pg_catalog.setval ('public.measures_measure_id_seq', 5, false);

--
-- Data for Name: subscription_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--
-- INSERT INTO public.subscription_plans (subscription_plan_id, trainee_id, plan_name, current_num_trainings, total_trainings, last_training) VALUES (1, 1, '2 trainings', 2, 2, '2022-10-23');
-- INSERT INTO public.subscription_plans (subscription_plan_id, trainee_id, plan_name, current_num_trainings, total_trainings, last_training) VALUES (2, 1, '2 training', 0, 2, '2022-10-27');
-- SELECT pg_catalog.setval('public.subscription_plans_subscription_plan_id_seq', 3, false);
--
-- Data for Name: training_programs_list; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
  public.training_programs_list (
    training_programs_list_id,
    trainee_id,
    program_type,
    date_start,
    date_end,
    note_topic,
    note_text
  )
VALUES
  (1, 1, 'a', '2022-10-19', '2022-10-27', '', '');

INSERT INTO
  public.training_programs_list (
    training_programs_list_id,
    trainee_id,
    program_type,
    date_start,
    date_end,
    note_topic,
    note_text
  )
VALUES
  (2, 1, 'b', '2022-10-19', '2022-10-25', '', '');

INSERT INTO
  public.training_programs_list (
    training_programs_list_id,
    trainee_id,
    program_type,
    date_start,
    date_end,
    note_topic,
    note_text
  )
VALUES
  (3, 1, 'fbw', '2022-10-19', '2022-10-27', '', '');

INSERT INTO
  public.training_programs_list (
    training_programs_list_id,
    trainee_id,
    program_type,
    date_start,
    date_end,
    note_topic,
    note_text
  )
VALUES
  (4, 4, 'fbw', '2022-10-26', '2022-10-27', '', '');

INSERT INTO
  public.training_programs_list (
    training_programs_list_id,
    trainee_id,
    program_type,
    date_start,
    date_end,
    note_topic,
    note_text
  )
VALUES
  (5, 2, 'fbw', '2022-10-26', '2022-10-27', '', '');

SELECT
  pg_catalog.setval (
    'public.training_programs_list_training_programs_list_id_seq',
    6,
    false
  );

--
-- Data for Name: training_program; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    3,
    1,
    6,
    '10-12',
    3,
    '1.5min',
    '75kg',
    6,
    '',
    '',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    4,
    1,
    8,
    '10-12',
    3,
    '1.5min',
    '50kg',
    7,
    '',
    '',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    6,
    2,
    10,
    '10-12',
    3,
    '1.5min',
    '60kg',
    7,
    '',
    '',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    5,
    2,
    13,
    '6-8',
    3,
    '1.5min',
    '25kg',
    7,
    '',
    '',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    8,
    2,
    12,
    '10-12',
    3,
    '1.5min',
    '75',
    7,
    '',
    'Super-set with lunge',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    9,
    3,
    13,
    '6-8',
    3,
    '1.5min',
    '30kg',
    7,
    '',
    '',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    10,
    3,
    1,
    '6-8',
    3,
    '1.5min',
    '100kg',
    8,
    '',
    '',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    11,
    3,
    11,
    '10-12',
    3,
    '1.5min',
    '15kg',
    5,
    'Super-set',
    'Super set with bent over row',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    12,
    3,
    10,
    '10-12',
    3,
    '1.5min',
    '60kg',
    3,
    'Super-set',
    'Super set with lunge',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    14,
    3,
    7,
    '10-12',
    3,
    '1.5min',
    '50kg',
    7,
    '',
    '',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    7,
    2,
    11,
    '10-12',
    3,
    '1.5min',
    '15kg',
    7,
    'Super-set',
    'Super-set with Stiff-Legs Death-lift',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    13,
    3,
    12,
    '10-12',
    3,
    '1.2min',
    '60kg5',
    6,
    '',
    '',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    15,
    4,
    1,
    '6-8',
    3,
    '1.5min',
    '55kg',
    5,
    '',
    '',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    17,
    4,
    7,
    '6-8',
    3,
    '2min',
    '0kg',
    7,
    '',
    '',
    NULL
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    1,
    1,
    1,
    '6-8',
    3,
    '1.5min',
    '100kg',
    3,
    '',
    '',
    '2022-10-11'
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    16,
    4,
    2,
    '6-8',
    3,
    '1.5min',
    '52kg',
    6,
    '',
    '',
    '2022-10-28'
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    18,
    4,
    9,
    '6-8',
    3,
    '1.5min',
    '0kg',
    7,
    '',
    '',
    '2022-10-25'
  );

INSERT INTO
  public.training_program (
    training_program_row_id,
    training_programs_list_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe,
    note_topic,
    note_text,
    update_date
  )
VALUES
  (
    19,
    5,
    2,
    '10-12',
    3,
    '1.5min',
    '60kg',
    1,
    '',
    '',
    '2022-10-17'
  );

SELECT
  pg_catalog.setval (
    'public.training_program_training_program_row_id_seq',
    20,
    false
  );

-- Data for Name: training_program_exercises_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (1, '2022-10-20', 1, 1, '6-8', 3, 1.2, 100, 3);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (2, '2022-10-21', 1, 1, '6-8', 3, 1.5, 100, 3);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (3, '2022-10-22', 13, 12, '10-12', 3, 1.2, 60, 6);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (4, '2022-10-25', 15, 1, '6-8', 3, 1.5, 50, 5);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (5, '2022-10-25', 16, 2, '6-8', 3, 1.5, 50, 6);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (6, '2022-10-25', 15, 1, '6-8', 3, 1.5, 55, 5);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (7, '2022-10-25', 17, 7, '6-8', 3, 2, 0, 7);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (8, '2022-10-11', 1, 1, '6-8', 3, 1.5, 100, 3);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (9, '2022-10-10', 16, 2, '6-8', 3, 1.5, 50, 6);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (10, '2022-10-26', 16, 2, '6-8', 3, 1.5, 58, 6);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (11, '2022-10-28', 16, 2, '6-8', 3, 1.5, 52, 6);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (12, '2022-10-25', 18, 9, '6-8', 3, 1.5, 0, 7);

INSERT INTO
  public.training_program_exercises_stats (
    training_program_exercises_stats_id,
    update_date,
    training_program_row_id,
    exercise_id,
    reps,
    sets,
    rest,
    intensity,
    rpe
  )
VALUES
  (13, '2022-10-17', 19, 2, '10-12', 3, 1.5, 60, 1);

SELECT
  pg_catalog.setval (
    'public.training_program_exercises_st_training_program_exercises_st_seq',
    14,
    false
  );

-- select
--   res.*,
--   act.activity_name
-- from
--   (
--     select
--       mt.*,
--       json_agg(
--         json_build_object(
--           'participants_group_id',
--           pgt.participants_group_id,
--           'trainee_id',
--           pgt.trainee_id,
--           'first_name',
--           pro.first_name,
--           "last_name",
--           pro.last_name
--         )
--       ) as "participants_group"
--     from
--       meetings as mt
--       LEFT JOIN participants_group as pgt ON mt.meeting_id = pgt.meeting_id
--       LEFT JOIN trainees as tr ON tr.trainee_id = pgt.trainee_id
--       LEFT JOIN profiles as pro ON tr.profile_id = pro.profile_id
--     group by
--       mt.meeting_id
--   ) as res
--   LEFT JOIN activities as act ON res.activity_id = act.activity_id;