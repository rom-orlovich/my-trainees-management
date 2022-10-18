--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.profiles (profile_id, first_name, last_name, gender, identify_num, birthday, email, phone_number, location_id, date_join, status) VALUES (1, NULL, NULL, NULL, NULL, NULL, 'mytraineesmanagement@gmail.com', NULL, NULL, NULL, false);
INSERT INTO public.profiles (profile_id, first_name, last_name, gender, identify_num, birthday, email, phone_number, location_id, date_join, status) VALUES (2, NULL, NULL, NULL, NULL, NULL, 'romorlovich@gmail.com', NULL, NULL, NULL, false);
INSERT INTO public.profiles (profile_id, first_name, last_name, gender, identify_num, birthday, email, phone_number, location_id, date_join, status) VALUES (3, 'rom', 'orlovich', 'male', '222222', '2022-10-16', 'rom-orlovich@cyber4s.dev', '0543552144', 1, '2022-10-15', true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (user_id, role, username, password, refresh_tokens, verify_token, profile_id) VALUES (1, 'admin', 'admin123', '$2a$10$8A/LXHx.jlPafHpBVNVE/u8F1ql6JCZ2r7Rrdt1pxuKqRc/9IroUS', '{}', NULL, 1);
INSERT INTO public.users (user_id, role, username, password, refresh_tokens, verify_token, profile_id) VALUES (3, 'trainee', 'trainee123', '$2a$10$CTyyTPHIAL.2tUXxQnWA0uAIVGz/c.Cc26WPDYCe0/i6u5Pe7nwMS', '{}', NULL, 3);
INSERT INTO public.users (user_id, role, username, password, refresh_tokens, verify_token, profile_id) VALUES (2, 'trainer', 'trainer123', '$2a$10$Hgfj2kwK0WDc23ilreOkM.oorSaMn9aKNLdLO1LuqhKy7b0ZqNepC', '{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NjExNzcyOCwiZXhwIjoxNjY2Mjc3MDE2fQ.ld9-Wf20EA5CsFzlnZuwHsQzlygJeO-e3VrM7JEvasM,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NjEyMTc3NywiZXhwIjoxNjY2MjkwOTA4fQ.2CfxagxlLRT_W8bbO9h6QoJYqE3sxxr88O5CqMiavLs,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NjEyMTc3OSwiZXhwIjoxNjY2Mjk0NTc5fQ.QNIpG_WXmNu_4qH41rn9h3G0Q4csBAfNUjpkN10uW8w}', NULL, 2);


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: alerts; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cities (city_id, city_name, district, population, user_id) VALUES (1, 'Kiryat Ono', 'center', 200000, 2);
INSERT INTO public.cities (city_id, city_name, district, population, user_id) VALUES (2, 'Tel Aviv', 'center', 300000, 2);
INSERT INTO public.cities (city_id, city_name, district, population, user_id) VALUES (3, 'Ramat Gan', 'center', 300000, 2);


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (1, 1, 'Moshe Hass', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (2, 2, 'R.s', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (3, 3, 'Ben Gurion', 2);


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: equipments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (1, 'Dips bar', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (2, 'Olympic bar', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (3, 'Hand weight', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (4, 'Training mattress', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (5, 'Pull ups bar', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (6, 'Weight Plates', 'none', 2020, NULL, 2);


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


--
-- Data for Name: exercises_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (1, 'Chest Press', 2, 2, 2);
INSERT INTO public.exercises_list (exercise_id, exercise_name, muscles_group_id, equipment_id, user_id) VALUES (3, 'Lunge', 1, 3, 2);
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


--
-- Data for Name: trainees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.trainees (trainee_id, trainer_user_id, user_id, profile_id, sign_up_token) VALUES (1, 2, 3, 3, '');


--
-- Data for Name: incomes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: nutrition_programs_list; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: nutrition_program; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: participants_group; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: subscription_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: training_programs_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, type_program, date_start, date_end, note_topic, note_text) VALUES (1, 1, 'a', '2022-10-19', '2022-10-27', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, type_program, date_start, date_end, note_topic, note_text) VALUES (2, 1, 'b', '2022-10-19', '2022-10-25', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, type_program, date_start, date_end, note_topic, note_text) VALUES (3, 1, 'fbw', '2022-10-19', '2022-10-27', '', '');


--
-- Data for Name: training_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (1, 1, 1, '6-10', 3, '12', '100kg', 3, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (3, 1, 6, '10-12', 3, '1.5min', '75kg', 6, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (4, 1, 8, '10-12', 3, '1.5min', '50kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (6, 2, 10, '10-12', 3, '1.5min', '60kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (5, 2, 13, '6-8', 3, '1.5min', '25kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (7, 2, 3, '10-12', 3, '1.5min', '15kg', 7, 'Super-set', 'Super-set with Stiff-Legs Death-lift');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (8, 2, 12, '10-12', 3, '1.5min', '75', 7, '', 'Super-set with lunge');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (9, 3, 13, '6-8', 3, '1.5min', '30kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (10, 3, 1, '6-8', 3, '1.5min', '100kg', 8, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (11, 3, 11, '10-12', 3, '1.5min', '15kg', 5, 'Super-set', 'Super set with bent over row');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (12, 3, 10, '10-12', 3, '1.5min', '60kg', 3, 'Super-set', 'Super set with lunge');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (13, 3, 12, '10-12', 3, '1.5min', '60kg', 6, '', '');
INSERT INTO public.training_program (training_program_row_id, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (14, 3, 7, '10-12', 3, '1.5min', '50kg', 7, '', '');


--
-- Data for Name: weeks; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: activities_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_activity_id_seq', 1, false);


--
-- Name: alerts_alert_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alerts_alert_id_seq', 37, true);


--
-- Name: cities_city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cities_city_id_seq', 3, true);


--
-- Name: equipments_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipments_equipment_id_seq', 6, true);


--
-- Name: exercises_list_exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercises_list_exercise_id_seq', 13, true);


--
-- Name: expenses_expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expenses_expense_id_seq', 1, false);


--
-- Name: incomes_income_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.incomes_income_id_seq', 1, false);


--
-- Name: leads_lead_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leads_lead_id_seq', 1, false);


--
-- Name: locations_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_location_id_seq', 3, true);


--
-- Name: muscles_group_muscles_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.muscles_group_muscles_group_id_seq', 7, true);


--
-- Name: nutrition_program_nutrition_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_program_nutrition_program_id_seq', 1, false);


--
-- Name: nutrition_programs_list_nutrition_programs_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_programs_list_nutrition_programs_list_id_seq', 1, false);


--
-- Name: participants_group_participant_groupe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participants_group_participant_groupe_id_seq', 1, false);


--
-- Name: profiles_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profiles_profile_id_seq', 3, true);


--
-- Name: providers_provider_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.providers_provider_id_seq', 1, false);


--
-- Name: schedule_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schedule_schedule_id_seq', 1, false);


--
-- Name: subscription_plans_subscription_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscription_plans_subscription_plan_id_seq', 1, false);


--
-- Name: trainees_trainee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trainees_trainee_id_seq', 1, true);


--
-- Name: training_program_training_program_row_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_program_training_program_row_id_seq', 14, true);


--
-- Name: training_programs_list_training_programs_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_programs_list_training_programs_list_id_seq', 3, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: weeks_week_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.weeks_week_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

