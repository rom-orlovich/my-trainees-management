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

INSERT INTO public.profiles (profile_id, first_name, last_name, gender, identify_num, birthday, email, phone_number, location_id, date_join, status, measure_id) VALUES (1, NULL, NULL, NULL, NULL, NULL, 'mytraineesmanagement@gmail.com', NULL, NULL, NULL, true, NULL);
INSERT INTO public.profiles (profile_id, first_name, last_name, gender, identify_num, birthday, email, phone_number, location_id, date_join, status, measure_id) VALUES (2, NULL, NULL, NULL, NULL, NULL, 'romorlovich@gmail.com', NULL, NULL, NULL, true, NULL);
INSERT INTO public.profiles (profile_id, first_name, last_name, gender, identify_num, birthday, email, phone_number, location_id, date_join, status, measure_id) VALUES (3, 'rom', 'orlovich', 'male', 222222, '2022-10-16', 'rom-orlovich@cyber4s.dev', '054-3552144', 1, '2022-10-15', true, NULL);
INSERT INTO public.profiles (profile_id, first_name, last_name, gender, identify_num, birthday, email, phone_number, location_id, date_join, status, measure_id) VALUES (4, 'Ido', 'Gideon', 'male', 920213, '2022-10-11', 'glind57@pickuplanet.com', '054-617-4272', 7, '2022-10-25', false, NULL);
INSERT INTO public.profiles (profile_id, first_name, last_name, gender, identify_num, birthday, email, phone_number, location_id, date_join, status, measure_id) VALUES (6, 'Tzvi', 'Daniela', 'male', 3851455, '2022-10-01', 'ninchu@grecc.me', '055-011-9485', 7, '2022-10-25', false, NULL);
INSERT INTO public.profiles (profile_id, first_name, last_name, gender, identify_num, birthday, email, phone_number, location_id, date_join, status, measure_id) VALUES (5, 'Nitza', 'Meira', 'female', 488554, '2022-10-09', 'czena1@chantellegribbon.com', '054-245-5250', 2, '2022-10-25', false, NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (user_id, role, username, password, refresh_tokens, verify_token, profile_id) VALUES (2, 'trainer', 'trainer123', '$2a$10$AbCTVp/Jk7QVLfflOIwN7OZaZdH488zzP0pND9yZJHEl2bbmiBBBK', '{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NzU3MDUwOCwiZXhwIjoxNjY3Njc2NjkxfQ.HsRq-9q9G86tSpwj8nmg-WuF5_TyTr5WUKDe4voZ7GM,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NzU3Njc4MywiZXhwIjoxNjY3NzQ5NTgzfQ.MEiga_MfxOM2NPeZrio1gwJX8OeJqm0omNVUuYICs74,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NzU4MTg0NSwiZXhwIjoxNjY3NzU0NjQ1fQ.F_k39sTp3LZqofB0qolE-TSIfGp_EN-3elIRAVABhrA,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NzU5MTI1OSwiZXhwIjoxNjY3NzY0MDU5fQ.2Bp19LU_ST_pNjx9DDeaHqg5mofXzBxIocNv3qTm4Bs,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NzU5MTMwMCwiZXhwIjoxNjY3NzY0MTAwfQ.LcHncjZpKVt24oCI2z8CtdI7S4pdsPdmEA5C4fhSGgA,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NzU5MTMzNSwiZXhwIjoxNjY3NzY0MTM1fQ.rcd8iOAvdvJHA3i7YNsmZe7KY0Q8xZlA7jsc5wf3Upk,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NzU5NDA0NiwiZXhwIjoxNjY3NzY2ODQ2fQ.gfKHpefd_xHQpcAGgE7q3s6SmTvdjgA6cuahGZfYPI4,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NzU5NTkwMiwiZXhwIjoxNjY3NzY4NzAyfQ.qOdQUJWkylRAbA0ahMZB0SO378v_HoNTGideEuSkuC8,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NzU5NjE3NiwiZXhwIjoxNjY3NzY4OTc2fQ.iMYHnQi6FEic9Q4LECa2lRI3stJHm4VF5Z79mAHNp_I,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lciIsInVzZXJfaWQiOjIsInVzZXJuYW1lIjoidHJhaW5lcjEyMyIsImlhdCI6MTY2NzYwMDM0MywiZXhwIjoxNjY3NzY5MzkzfQ.eINo54Z9tktcCF5fapsCRHGm3bxxsqqcVGlUvurA4hA}', NULL, 2);
INSERT INTO public.users (user_id, role, username, password, refresh_tokens, verify_token, profile_id) VALUES (1, 'admin', 'admin123', '$2a$10$WWHUTphuspaHtQr6P1Ve.eeKwzY1Yl5waI8RaAHjsRUdc5TZtJwBG', '{}', NULL, 1);
INSERT INTO public.users (user_id, role, username, password, refresh_tokens, verify_token, profile_id) VALUES (3, 'trainee', 'trainee123', '$2a$10$7m.G2pE.mD3u8VtxB.iG7u9jAo2PLX17DPzgWOiKySMoY1AAXVO2u', '{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lZSIsInVzZXJfaWQiOjMsInVzZXJuYW1lIjoidHJhaW5lZTEyMyIsImlhdCI6MTY2NzU4MDU2NiwiZXhwIjoxNjY3NzUzMzY2fQ.GVh82m4gw1pTG-BiI-RWq2dOU5fN_aAN2XbPU6CqgR4,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lZSIsInVzZXJfaWQiOjMsInVzZXJuYW1lIjoidHJhaW5lZTEyMyIsImlhdCI6MTY2NzU4MDc1OSwiZXhwIjoxNjY3NzUzNTU5fQ.ExxS6VvjqXJheUXkGPwWzWJUlBaapFqmpSr-73pcWe8,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lZSIsInVzZXJfaWQiOjMsInVzZXJuYW1lIjoidHJhaW5lZTEyMyIsImlhdCI6MTY2NzU4Mzc1NSwiZXhwIjoxNjY3NzUzNTY0fQ.qlJTmZnrXfL75M1KrZMj2VnRox3K_K6eOfvRqhjWVIs,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidHJhaW5lZSIsInVzZXJfaWQiOjMsInVzZXJuYW1lIjoidHJhaW5lZTEyMyIsImlhdCI6MTY2NzU5NTc3NywiZXhwIjoxNjY3NzY4NTc3fQ.wMJAYQ1TEAIXvCrEBwpa7RToNmDBbpvUnEm92ZhnSEc}', NULL, 3);


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.activities (activity_id, activity_name, user_id) VALUES (1, 'Couples training', 2);
INSERT INTO public.activities (activity_id, activity_name, user_id) VALUES (2, 'Personal Training', 2);


--
-- Data for Name: alerts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.alerts (alert_id, alert_date, alert_message, user_id) VALUES (180, '2022-11-04 17:00:58.910444+02', 'Login is success!', 1);


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cities (city_id, city_name, district, population, user_id) VALUES (1, 'Kiryat Ono', 'center', 200000, 2);
INSERT INTO public.cities (city_id, city_name, district, population, user_id) VALUES (2, 'Tel Aviv', 'center', 300000, 2);
INSERT INTO public.cities (city_id, city_name, district, population, user_id) VALUES (3, 'Ramat Gan', 'center', 300000, 2);
INSERT INTO public.cities (city_id, city_name, district, population, user_id) VALUES (4, 'Petah Tikva', 'center', 300000, 2);
INSERT INTO public.cities (city_id, city_name, district, population, user_id) VALUES (5, 'Hod HaSharon', 'center', 200000, 2);
INSERT INTO public.cities (city_id, city_name, district, population, user_id) VALUES (6, 'Rishon Lezion', 'center', 200000, 2);


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
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (8, 't', 2);


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


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products (product_id, product_name, product_type, max_training, price, user_id) VALUES (7, 'weights', 'Expense', 1, 20, 2);
INSERT INTO public.products (product_id, product_name, product_type, max_training, price, user_id) VALUES (8, 'training 1', 'Subscription Plan', 1, 1, 2);


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: trainees; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.trainees (trainee_id, trainer_user_id, user_id, profile_id, sign_up_token) VALUES (1, 2, 3, 3, '');
INSERT INTO public.trainees (trainee_id, trainer_user_id, user_id, profile_id, sign_up_token) VALUES (2, 2, NULL, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdsaW5kNTdAcGlja3VwbGFuZXQuY29tIiwicHJvZmlsZV9pZCI6NCwidG9rZW5UeXBlIjoxLCJpYXQiOjE2NjY3MTM3MTMsImV4cCI6MTY2NjgwMDExM30.YAo3VGlDToUHDltwp5odkjxWFo4HljjzAsGVQ-vttCs');
INSERT INTO public.trainees (trainee_id, trainer_user_id, user_id, profile_id, sign_up_token) VALUES (4, 2, NULL, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbmNodUBncmVjYy5tZSIsInByb2ZpbGVfaWQiOjYsInRva2VuVHlwZSI6MSwiaWF0IjoxNjY2NzE1MjExLCJleHAiOjE2NjY4MDE2MTF9.FTuglCoyBEuBc6HsLiHWIL0Y8z-rtwCv0aXu3ekLTrM');
INSERT INTO public.trainees (trainee_id, trainer_user_id, user_id, profile_id, sign_up_token) VALUES (3, 2, NULL, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN6ZW5hMUBjaGFudGVsbGVncmliYm9uLmNvbSIsInByb2ZpbGVfaWQiOjUsInRva2VuVHlwZSI6MSwiaWF0IjoxNjY2NzEzNzk4LCJleHAiOjE2NjY4MDAxOTh9.Pp7EHsTmB-lAiSGjZcOzBBkgXc0FjQUgKjCvDuJvrq8');


--
-- Data for Name: incomes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.leads (lead_id, lead_date, first_name, last_name, phone_number, email, status, note_topic, note_text, user_id) VALUES (1, '2022-10-10', 'Ido', 'Gideon', '21223123', 'a@b.com', false, '', '', 2);
INSERT INTO public.leads (lead_id, lead_date, first_name, last_name, phone_number, email, status, note_topic, note_text, user_id) VALUES (2, '2022-10-25', 'Nitza', ' Daniela', '054-617-4272', 'aaas@asd.com', false, '', '', 2);
INSERT INTO public.leads (lead_id, lead_date, first_name, last_name, phone_number, email, status, note_topic, note_text, user_id) VALUES (3, '2022-10-25', 'Tzvi', 'yehc', '21223123', 'sasd@oads.com', false, 'b', '', 2);
INSERT INTO public.leads (lead_id, lead_date, first_name, last_name, phone_number, email, status, note_topic, note_text, user_id) VALUES (4, '2022-10-25', 'Ido', 'asd', '059-960-0499', 'olgapaveleva87@gmailwe.com', false, '', '', 2);
INSERT INTO public.leads (lead_id, lead_date, first_name, last_name, phone_number, email, status, note_topic, note_text, user_id) VALUES (5, '2022-10-24', 'Shachar', ' Leah', '058-983-7010', 'tequilasunrise@dogbackpack.net', true, '', '', 2);
INSERT INTO public.leads (lead_id, lead_date, first_name, last_name, phone_number, email, status, note_topic, note_text, user_id) VALUES (6, '2022-10-25', 'Ora', 'Uriel', '055-729-4430', 'gobugayu@unair.nl', false, '', '', 2);


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (1, 1, 'Moshe Hass', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (2, 2, 'R.s', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (3, 3, 'Ben Gurion', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (4, 5, '1 Modiin', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (5, 3, '5 Metula', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (6, 6, ' 74 Herzl Blvd', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (7, 2, '39 Levinsky', 2);
INSERT INTO public.locations (location_id, city_id, street, user_id) VALUES (8, 2, '22 Kvir St', 2);


--
-- Data for Name: measures; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.measures (measure_id, profile_id, date, weight, height, fat_percents, activity_factor, protein_per_kg, fat_per_kg, protein_g, fat_g, crabs_g, protein_cals, fat_cals, crabs_cals, fixed_cals, calories_total) VALUES (1, 3, '2022-10-24', 70, 165, NULL, 28, 1.8, 0.5, 126, 35, 535.25, 504, 315, 2141, 1000, 2960);
INSERT INTO public.measures (measure_id, profile_id, date, weight, height, fat_percents, activity_factor, protein_per_kg, fat_per_kg, protein_g, fat_g, crabs_g, protein_cals, fat_cals, crabs_cals, fixed_cals, calories_total) VALUES (2, 4, '2022-10-24', 65.3, 150, NULL, 30, 1.6, 0.5, 104.48, 32.65, 311.81, 417.92, 293.85, 1247.23, 0, 1959);
INSERT INTO public.measures (measure_id, profile_id, date, weight, height, fat_percents, activity_factor, protein_per_kg, fat_per_kg, protein_g, fat_g, crabs_g, protein_cals, fat_cals, crabs_cals, fixed_cals, calories_total) VALUES (3, 6, '2022-10-24', 65, 160, NULL, 28, 1.6, 0.5, 104, 32.5, 277.88, 416, 292.5, 1111.5, 0, 1820);
INSERT INTO public.measures (measure_id, profile_id, date, weight, height, fat_percents, activity_factor, protein_per_kg, fat_per_kg, protein_g, fat_g, crabs_g, protein_cals, fat_cals, crabs_cals, fixed_cals, calories_total) VALUES (4, 5, '2022-10-24', 60, 178, NULL, 28, 1.6, 0.5, 96, 30, 256.5, 384, 270, 1026, 0, 1680);


--
-- Data for Name: participants_groups_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.participants_groups_list (participants_groups_list_id, group_name, is_private, user_id) VALUES (2, 'ido trainings', true, 2);
INSERT INTO public.participants_groups_list (participants_groups_list_id, group_name, is_private, user_id) VALUES (35, 'y', false, 2);
INSERT INTO public.participants_groups_list (participants_groups_list_id, group_name, is_private, user_id) VALUES (47, 't', false, 2);
INSERT INTO public.participants_groups_list (participants_groups_list_id, group_name, is_private, user_id) VALUES (48, 's', false, 2);
INSERT INTO public.participants_groups_list (participants_groups_list_id, group_name, is_private, user_id) VALUES (49, 'r', false, 2);
INSERT INTO public.participants_groups_list (participants_groups_list_id, group_name, is_private, user_id) VALUES (50, 'r', false, 2);
INSERT INTO public.participants_groups_list (participants_groups_list_id, group_name, is_private, user_id) VALUES (16, 'guy training', true, 2);
INSERT INTO public.participants_groups_list (participants_groups_list_id, group_name, is_private, user_id) VALUES (1, 'rom training', false, 2);


--
-- Data for Name: meetings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.meetings (meeting_id, activity_id, date_start, date_end, participants_groups_list_id, location_id, note_topic, note_text, user_id) VALUES (17, 1, '2022-11-03 06:00:00+02', '2022-11-03 06:30:00+02', 1, 1, '2', '', 2);
INSERT INTO public.meetings (meeting_id, activity_id, date_start, date_end, participants_groups_list_id, location_id, note_topic, note_text, user_id) VALUES (18, 2, '2022-11-06 18:00:00+02', '2022-11-06 18:30:00+02', 2, 1, 'personal training', '', 2);
INSERT INTO public.meetings (meeting_id, activity_id, date_start, date_end, participants_groups_list_id, location_id, note_topic, note_text, user_id) VALUES (19, 2, '2022-11-09 18:00:00+02', '2022-11-09 18:30:00+02', 2, 1, 'personal training', '', 2);
INSERT INTO public.meetings (meeting_id, activity_id, date_start, date_end, participants_groups_list_id, location_id, note_topic, note_text, user_id) VALUES (20, 2, '2022-11-15 13:00:00+02', '2022-11-15 13:30:00+02', 1, 1, 'Personal training', '', 2);
INSERT INTO public.meetings (meeting_id, activity_id, date_start, date_end, participants_groups_list_id, location_id, note_topic, note_text, user_id) VALUES (21, 2, '2022-11-09 19:30:00+02', '2022-11-09 20:00:00+02', 16, 1, 'personal training', '', 2);


--
-- Data for Name: nutrition_programs_list; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: nutrition_program; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: participants_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.participants_group (participants_group_id, participants_groups_list_id, trainee_id, user_id) VALUES (1, 1, 1, 2);


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: subscription_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: training_programs_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, program_type, update_date, date_start, date_end, note_topic, note_text) VALUES (1, 1, 'a', NULL, '2022-10-19', '2022-10-27', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, program_type, update_date, date_start, date_end, note_topic, note_text) VALUES (2, 1, 'b', NULL, '2022-10-19', '2022-10-25', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, program_type, update_date, date_start, date_end, note_topic, note_text) VALUES (3, 1, 'fbw', NULL, '2022-10-19', '2022-10-27', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, program_type, update_date, date_start, date_end, note_topic, note_text) VALUES (4, 4, 'fbw', NULL, '2022-10-26', '2022-10-27', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, program_type, update_date, date_start, date_end, note_topic, note_text) VALUES (5, 2, 'fbw', NULL, '2022-10-26', '2022-10-27', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, program_type, update_date, date_start, date_end, note_topic, note_text) VALUES (7, 1, 'k', NULL, '2022-11-04', '2022-11-05', '', '');


--
-- Data for Name: training_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (3, NULL, 1, 6, '10-12', 3, '1.5min', '75kg', 6, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (4, NULL, 1, 8, '10-12', 3, '1.5min', '50kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (6, NULL, 2, 10, '10-12', 3, '1.5min', '60kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (5, NULL, 2, 13, '6-8', 3, '1.5min', '25kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (8, NULL, 2, 12, '10-12', 3, '1.5min', '75', 7, '', 'Super-set with lunge');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (9, NULL, 3, 13, '6-8', 3, '1.5min', '30kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (10, NULL, 3, 1, '6-8', 3, '1.5min', '100kg', 8, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (11, NULL, 3, 11, '10-12', 3, '1.5min', '15kg', 5, 'Super-set', 'Super set with bent over row');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (12, NULL, 3, 10, '10-12', 3, '1.5min', '60kg', 3, 'Super-set', 'Super set with lunge');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (14, NULL, 3, 7, '10-12', 3, '1.5min', '50kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (7, NULL, 2, 11, '10-12', 3, '1.5min', '15kg', 7, 'Super-set', 'Super-set with Stiff-Legs Death-lift');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (13, NULL, 3, 12, '10-12', 3, '1.2min', '60kg5', 6, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (15, NULL, 4, 1, '6-8', 3, '1.5min', '55kg', 5, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (17, NULL, 4, 7, '6-8', 3, '2min', '0kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (1, '2022-10-11', 1, 1, '6-8', 3, '1.5min', '100kg', 3, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (16, '2022-10-28', 4, 2, '6-8', 3, '1.5min', '52kg', 6, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (18, '2022-10-25', 4, 9, '6-8', 3, '1.5min', '0kg', 7, '', '');
INSERT INTO public.training_program (training_program_row_id, update_date, training_programs_list_id, exercise_id, reps, sets, rest, intensity, rpe, note_topic, note_text) VALUES (19, '2022-10-17', 5, 2, '10-12', 3, '1.5min', '60kg', 1, '', '');


--
-- Data for Name: training_program_exercises_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (1, '2022-10-20', 1, 1, '6-8', 3, 1.2, 100, 3);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (2, '2022-10-21', 1, 1, '6-8', 3, 1.5, 100, 3);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (3, '2022-10-22', 13, 12, '10-12', 3, 1.2, 60, 6);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (4, '2022-10-25', 15, 1, '6-8', 3, 1.5, 50, 5);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (5, '2022-10-25', 16, 2, '6-8', 3, 1.5, 50, 6);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (6, '2022-10-25', 15, 1, '6-8', 3, 1.5, 55, 5);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (7, '2022-10-25', 17, 7, '6-8', 3, 2, 0, 7);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (8, '2022-10-11', 1, 1, '6-8', 3, 1.5, 100, 3);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (9, '2022-10-10', 16, 2, '6-8', 3, 1.5, 50, 6);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (10, '2022-10-26', 16, 2, '6-8', 3, 1.5, 58, 6);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (11, '2022-10-28', 16, 2, '6-8', 3, 1.5, 52, 6);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (12, '2022-10-25', 18, 9, '6-8', 3, 1.5, 0, 7);
INSERT INTO public.training_program_exercises_stats (training_program_exercises_stats_id, update_date, training_program_row_id, exercise_id, reps, sets, rest, intensity, rpe) VALUES (13, '2022-10-17', 19, 2, '10-12', 3, 1.5, 60, 1);


--
-- Data for Name: weeks; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: activities_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_activity_id_seq', 2, true);


--
-- Name: alerts_alert_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alerts_alert_id_seq', 219, true);


--
-- Name: cities_city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cities_city_id_seq', 7, false);


--
-- Name: equipments_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipments_equipment_id_seq', 7, false);


--
-- Name: exercises_list_exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercises_list_exercise_id_seq', 14, false);


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

SELECT pg_catalog.setval('public.leads_lead_id_seq', 7, false);


--
-- Name: locations_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_location_id_seq', 9, false);


--
-- Name: measures_measure_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.measures_measure_id_seq', 5, false);


--
-- Name: meetings_meeting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.meetings_meeting_id_seq', 21, true);


--
-- Name: muscles_group_muscles_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.muscles_group_muscles_group_id_seq', 8, true);


--
-- Name: nutrition_program_nutrition_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_program_nutrition_program_id_seq', 1, false);


--
-- Name: nutrition_programs_list_nutrition_programs_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_programs_list_nutrition_programs_list_id_seq', 1, false);


--
-- Name: participants_group_participants_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participants_group_participants_group_id_seq', 2, true);


--
-- Name: participants_groups_list_participants_groups_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participants_groups_list_participants_groups_list_id_seq', 50, true);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_product_id_seq', 9, true);


--
-- Name: profiles_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profiles_profile_id_seq', 7, false);


--
-- Name: providers_provider_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.providers_provider_id_seq', 1, false);


--
-- Name: subscription_plans_subscription_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscription_plans_subscription_plan_id_seq', 1, false);


--
-- Name: trainees_trainee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trainees_trainee_id_seq', 5, false);


--
-- Name: training_program_exercises_st_training_program_exercises_st_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_program_exercises_st_training_program_exercises_st_seq', 14, false);


--
-- Name: training_program_training_program_row_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_program_training_program_row_id_seq', 20, false);


--
-- Name: training_programs_list_training_programs_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_programs_list_training_programs_list_id_seq', 7, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: weeks_week_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--




--
-- PostgreSQL database dump complete
--

