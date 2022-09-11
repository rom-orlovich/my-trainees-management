# My Trainees Managment App:
Link to the app: [My Trainees Managment App](https://my-trainees-managment.herokuapp.com):point_left:

## About my project:

My Trainees app management is a web app application that assists
personal trainers in managing their business’s system.
\
The app helps the trainer manage his trainees training and nutrition programs, his leads and business’s financials.

## Why I chose this project:
As a self employed personal trainer, I wanted to combine my passion for programming with the world of personal training.
\
During my work I have experienced difficulties with managing my business due to not having a single app that comprises all of the tools I needed.
\
Therefore, I've decided to create one myself - An app that creates an overview of my trainees and their progesses.

My Linkedin - [Rom Orlovich](https://www.linkedin.com/in/rom-orlovich/)

## Technologies:

- **[React](https://reactjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Sass](https://www.npmjs.com/package/sass)**
- **[Express](https://www.npmjs.com/package/express)**
- **[PostgreSQL](https://www.postgresql.org/)**

## Packages:

- **Front-end** :
    - [Redux RTK](https://www.npmjs.com/package/@reduxjs/toolkit) - For state management.
    - [React Router](https://www.npmjs.com/package/react-router-dom) - For routes management.
    - [React Hook Form](https://www.npmjs.com/package/react-hook-form) - For forms management.
    - [Yup](https://www.npmjs.com/package/yup) - For validation.
    - [React Icons](https://www.npmjs.com/package/react-icons) - For icons

- **Back-end**:
    - [node-postgres](https://www.npmjs.com/package/pg) - For DB management
    - [Yup](https://www.npmjs.com/package/yup) - For validation
    - [webpack](https://www.npmjs.com/package/webpack) - For modules bundling and build the server side.
    - [dotenv](https://www.npmjs.com/package/dotenv) - For environment variables

## Installation
1. **Clone the repo**
   ```
   git clone https://github.com/rom-orlovich/my-trainees-management.git
   ```
2. **Install all the dependencies** 
   ```
   npm run init-p 
   ```
3. **Run server**
   ```
   npm run server
   ```
   
4. **Run Client**
   ```
   npm run start
   ```

5. **Go to http://localhost:3000 and have fun**!

## Main Features:
1. **Create/Read/Update/Delete** - Data of trainees, trainings programs, training program's exercises, muscule groups, equipments, 
leads, cities, locations and app's notes.
2. **Table paginiation** - Pagination buttons will display when the number of table's rows will be greater than 10 rows.
3. **Filter table's rows by name** - Filter the table's rows by the name of row.  
4. **Infinte scroll autocomplete search input** - Autocomplete input which suggests a list of results from the server. \
 When the number of possible results are greater than 10 results, the users can scroll and fetch more results from the server. 
 
 ## Comeing soon:
 1. **Notifications system** -Displaying notifications as output of user activities.
 2. **Trainee Profile Page**- Trainee's Profile page that will display all his personal data, programs and subscription state.  
 3. **Create/Read/Update/Delete** - Data of nutrition programs progress, finicanls systems, providers.
 4. **Users System**- Trainees will be able to login to thier profiles and track thier progress. \
 Other personal trainers can login and manage thier businesses.
 5. **Statistics Page** - Presonal trainers will have a graphical overview about thier businesses.


