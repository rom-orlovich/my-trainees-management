# My Trainees Management App:

Link to the app: [My Trainees Management App](https://my-trainee-management-new.herokuapp.com/login):point_left:

## About my project:

My Trainees app management is a web app application that assists
personal trainers in managing their business’s system.
\
The app helps the trainer manage his trainee's training and nutrition programs, his leads and the business’s finances.

## Why I chose this project:

As a self-employed personal trainer, I wanted to combine my passion for programming with the world of personal training.
\During my work, I have experienced difficulties with managing my business due to not having a single app that comprises all of the tools I needed.
\
Therefore, I've decided to create one myself - An app that creates an overview of my trainees and their progress.

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

1. **Modify App's Data** - Create/Read/Update/Delete the following data: Trainees, training programs, training programs' exercises, muscles group, equipment, leads, cities and locations.
2. **Table Pagination** - Shows when there are more than 10 items.
3. **Filter Table's Rows By Name** - Filters the table items by name.
4. **Autocomplete Search Input** - Suggests a list of results from the server. \
   Infinite scroll: When there are more than 10 possible suggestions, the users can scroll and fetch more suggestions from the server.
5. **Notifications System** -Notifications display for various user activities.
6. **Users System** - Trainees will be able to log in to their profiles and track their progress.\
     Multiple personal trainers will be able to log in and manage their business.
## Coming soon:

2.  **Sort Table's Items By Name** -Table will Sort items by name.
3.  **Trainee Profile Page** - The page will display all his personal data, programs and his subscription status.
4.  **Additional System Data** - Nutrition program's progress, financial system and suppliers.

6.  **Statistics Page** - Personal trainers will have a graphical overview of their business.
