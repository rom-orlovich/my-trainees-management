INSERT INTO cities (city_id, city_name, district, population, user_id) VALUES (1, 'Kiryat Ono', 'center', 200000, 2);
INSERT INTO cities (city_id, city_name, district, population, user_id) VALUES (2, 'Tel Aviv', 'center', 300000, 2);
INSERT INTO cities (city_id, city_name, district, population, user_id) VALUES (3, 'Ramat Gan', 'center', 300000, 2);
INSERT INTO cities (city_id, city_name, district, population, user_id) VALUES (4, 'Petah Tikva', 'center', 300000, 2);

SELECT pg_catalog.setval('public.cities_city_id_seq', 5, false);


  
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (1, 1, 'Moshe Hass', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (2, 2, 'R.s', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (3, 3, 'Ben Gurion', 2);

SELECT pg_catalog.setval('public.locations_location_id_seq', 4, false);
update profiles set 
 email='rom-orlovich@cyber4s.dev',status=true, date_join='2022-10-15T21:00:00.000Z',
 location_id=1,phone_number='054-3552144',birthday='2022-10-16T21:00:00.000Z',
 identify_num=222222,gender='male',last_name='orlovich',first_name='rom'
WHERE profile_id=3;

 INSERT INTO trainees
 (user_id,profile_id,trainer_user_id,sign_up_token)
   VALUES (3,3, 2,'');





--

--

INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (1, 'Dips bar', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (2, 'Olympic bar', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (3, 'Hand weight', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (4, 'Training mattress', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (5, 'Pull ups bar', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (6, 'Weight Plates', 'none', 2020, NULL, 2);

SELECT pg_catalog.setval('public.equipments_equipment_id_seq',7, false);
--
-- Data for Name: muscles_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (1, 'Legs', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (2, 'Chest', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (3, 'Back', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (4, 'Triceps', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (6, 'ABS', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (7, 'Biceps', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (5, 'Shoulders', 2);

SELECT pg_catalog.setval('public.muscles_group_muscles_group_id_seq', 8, false);
--
-- Data for Name: exercises_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (1, 'Chest Press', 2, 2, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (4, 'Dips', 2, 1, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (2, 'Squat', 1, 2, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (6, 'Upper Chest Press', 2, 2, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (7, 'Wide-Dips with weight', 2, 6, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (8, 'Narrow-Dips with weight', 4, 1, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (9, 'Pull Ups', 3, 6, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (10, 'Bent Over Row', 3, 2, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (12, 'Stiff Legs Death -Lift', 1, 2, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (11, 'Lunge', 1, 3, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (13, 'Pull Ups with weight', 3, 6, 2);

SELECT pg_catalog.setval('public.exercises_list_exercise_id_seq', 14, false);







--
-- Data for Name: subscription_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subscription_plans (subscription_plan_id, trainee_id, plan_name, current_num_trainings, total_trainings, last_training) VALUES (1, 1, '2 trainings', 0, 2, '2022-10-23');

SELECT pg_catalog.setval('public.subscription_plans_subscription_plan_id_seq', 2, false);
--
-- Data for Name: training_programs_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, type_program, date_start, date_end, note_topic, note_text) VALUES (1, 1, 'a', '2022-10-19', '2022-10-27', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, type_program, date_start, date_end, note_topic, note_text) VALUES (2, 1, 'b', '2022-10-19', '2022-10-25', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, type_program, date_start, date_end, note_topic, note_text) VALUES (3, 1, 'fbw', '2022-10-19', '2022-10-27', '', '');
SELECT pg_catalog.setval('public.training_programs_list_training_programs_list_id_seq', 4, false);

--
-- Data for Name: training_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (3, 1, 6, '10-12', 3, '1.5min', '75kg', 6, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (4, 1, 8, '10-12', 3, '1.5min', '50kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (6, 2, 10, '10-12', 3, '1.5min', '60kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (5, 2, 13, '6-8', 3, '1.5min', '25kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (8, 2, 12, '10-12', 3, '1.5min', '75', 7, '', 'Super-set with lunge');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (9, 3, 13, '6-8', 3, '1.5min', '30kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (10, 3, 1, '6-8', 3, '1.5min', '100kg', 8, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (11, 3, 11, '10-12', 3, '1.5min', '15kg', 5, 'Super-set', 'Super set with bent over row');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (12, 3, 10, '10-12', 3, '1.5min', '60kg', 3, 'Super-set', 'Super set with lunge');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (14, 3, 7, '10-12', 3, '1.5min', '50kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (7, 2, 11, '10-12', 3, '1.5min', '15kg', 7, 'Super-set', 'Super-set with Stiff-Legs Death-lift');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (1, 1, 1, '6-8', 3, '1.5min', '100kg', 3, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (13, 3, 12, '10-12', 3, '1.2min', '60kg5', 6, '', '');

SELECT pg_catalog.setval('public.training_program_training_program_row_id_seq', 15, false);


-- Data for Name: training_program_exercises_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (1, '2022-10-20', 1, 1, '6-8', 3, 1.2, 100, 3);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (2, '2022-10-21', 1, 1, '6-8', 3, 1.5, 100, 3);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (3, '2022-10-22', 13, 12, '10-12', 3, 1.2, 60, 6);


SELECT pg_catalog.setval('public.training_program_exercises_st_training_program_exercises_st_seq', 4, false);


