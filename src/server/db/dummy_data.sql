INSERT INTO cities as c (population,district,city_name,user_id)
   VALUES 
(200000,'center','Kiryat Ono',2),
(300000,'center','Tel Aviv', 2),
(300000,'center','Ramat Gan', 2);


INSERT INTO muscles_group as mg (user_id,muscles_group_name)
   VALUES
 (2,'Legs') ,
 (2,'Chest') ,
 (2,'Back') ,
 (2,'Triceps') ,
 (2,'Shoulder') ,
 (2,'ABS') ,
 (2,'Biceps') ;



INSERT INTO equipments as eq
 (manufacture_year,brand,equipment_name,user_id)
   VALUES 
(2020,'none', 'Dips bar',2) ,
(2020,'none', 'Olympic bar',2) ,
(2020,'none', 'Hand weight',2) ,
(2020,'none', 'Training mattress',2),
(2020,'none', 'Pull ups bar',2);


INSERT INTO locations as lo (street,city_id,user_id)
   VALUES 
   ('Moshe Hass',1,2),
    ('R.s',2,2) ,
     ('Ben Gurion',3,2) ;
  

INSERT INTO exercises_list as exer (equipment_id,muscles_group_id,exercise_name,user_id)
   VALUES 
   (2,2,'Chest Press', 2) ,
     (2,1,'Sqaut', 2) ,
       (3,1,'Lunge', 2) ,
       (1,2,'Dips', 2) ;


INSERT INTO profiles
 (email,status,date_join,
 location_id,phone_number,birthday,
 identify_num,gender,last_name,first_name)
VALUES 
( 'madman280797@gmail.com',true, '2022-10-15T21:00:00.000Z',
 1,'0543552144','2022-10-16T21:00:00.000Z',
 '222222','male','orlovich','rom') 
 RETURNING *;

 INSERT INTO trainees
 (user_id,profile_id,trainer_user_id,sign_up_token)
   VALUES (3,4, 2,'') RETURNING *;

