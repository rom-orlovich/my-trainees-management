INSERT INTO cities as c (population,district,city_name,user_id)
   VALUES 
(200000,'center','Kiryat Ono',2),
(300000,'center','Tel Aviv', 2),
(300000,'center','Ramat Gan', 2);


-- INSERT INTO muscles_group as mg (user_id,muscles_group_name)
--    VALUES
--  (2,'Legs') ,
--  (2,'Chest') ,
--  (2,'Back') ,
--  (2,'Triceps') ,
--  (2,'Shoulder') ,
--  (2,'ABS') ,
--  (2,'Biceps') ;



-- INSERT INTO equipments as eq
--  (manufacture_year,brand,equipment_name,user_id)
--    VALUES 
-- (2020,'none', 'Dips bar',2) ,
-- (2020,'none', 'Olympic bar',2) ,
-- (2020,'none', 'Hand weight',2) ,
-- (2020,'none', 'Training mattress',2),
-- (2020,'none', 'Pull ups bar',2);

-- INSERT INTO exercises_list as exer (equipment_id,muscles_group_id,exercise_name,user_id)
--    VALUES 
--    (2,2,'Chest Press', 2) ,
--      (2,1,'Sqaut', 2) ,
--        (3,1,'Lunge', 2) ,
--        (1,2,'Dips', 2) ;


INSERT INTO locations as lo (street,city_id,user_id)
   VALUES 
   ('Moshe Hass',1,2),
    ('R.s',2,2) ,
     ('Ben Gurion',3,2) ;
  


update profiles set 
 email='rom-orlovich@cyber4s.dev',status=true, date_join='2022-10-15T21:00:00.000Z',
 location_id=1,phone_number='0543552144',birthday='2022-10-16T21:00:00.000Z',
 identify_num='222222',gender='male',last_name='orlovich',first_name='rom'
WHERE profile_id=3;

 INSERT INTO trainees
 (user_id,profile_id,trainer_user_id,sign_up_token)
   VALUES (3,3, 2,'');



INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (1, 'Dips bar', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (2, 'Olympic bar', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (3, 'Hand weight', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (4, 'Training mattress', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (5, 'Pull ups bar', 'none', 2020, NULL, 2);
INSERT INTO public.equipments (equipment_id, equipment_name, brand, manufacture_year, expense_id, user_id) VALUES (6, 'Weight Plates', 'none', 2020, NULL, 2);


INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (1, 'Legs', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (2, 'Chest', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (3, 'Back', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (4, 'Triceps', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (6, 'ABS', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (7, 'Biceps', 2);
INSERT INTO public.muscles_group (muscles_group_id, muscles_group_name, user_id) VALUES (5, 'Shoulders', 2);


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


INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, type_program, date_start, date_end, note_topic, note_text) VALUES (1, 1, 'a', '2022-10-19', '2022-10-27', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, type_program, date_start, date_end, note_topic, note_text) VALUES (2, 1, 'b', '2022-10-19', '2022-10-25', '', '');
INSERT INTO public.training_programs_list (training_programs_list_id, trainee_id, type_program, date_start, date_end, note_topic, note_text) VALUES (3, 1, 'fbw', '2022-10-19', '2022-10-27', '', '');


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

