# REST API for EUEE

  ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/heyeman/alx-backend_project?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/heyeman/alx-backend_project?style=flat&logo=appveyor)


  ## Description

  *The what, why, and how:*

  Final portfolio project for ALX back-end track graduation
Every year, Ethiopian high school seniors seat for their national university entrance exam. They are given above 80 multiple choice questions for about 7 subjects. 
This project is a contains a REST API for developers to fetch national exam questions from the year 2005-2010(Ethiopian calendar) with an API key. It also let's them check the answers returned by the user.
 

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)

  ## Installation

  *Steps required to install project and how to get the development environment running:*

  1. clone this github repo(https://github.com/Heyeman/alx-backend_project)
  2. change your directory to alx-backend_project with alx-backend_project
  3. install the required dependency list with npm install
  4. execute the project with node index
  - if the server starts with no error, the following is printed to the console
```
Server listening to port 5000
MySQL with Prisma connected
Database connected successfully 
```

## Installation  & Dependency list
- Node.js
- express.js and express async handler
- mongoose
- prisma & prisma client
- bcrypt
- jsonwebtoken
- colors


## Directory Hierarchy
```
|—— .env
|—— .gitignore
|—— backend
|    |—— app.js
|    |—— config
|        |—— dbConn.js
|    |—— controllers
|        |—— authControllers.js
|        |—— examControllers.js
|        |—— keyControllers.js
|    |—— helpers
|        |—— 404handler.js
|        |—— eventListener.js
|        |—— tokenGen.js
|    |—— middlewares
|        |—— errorHandler.js
|        |—— keyChecker.js
|        |—— routeProtector.js
|    |—— models
|        |—— apiKeyModel.js
|        |—— questionModel.js
|        |—— resStatusModel.js
|        |—— userModel.js
|    |—— routes
|        |—— authRoutes.js
|        |—— examRoutes.js
|        |—— keyRoutes.js
|        |—— subjectRoutes.js
|—— index.js
|—— prisma
|    |—— schema.prisma
```

## Usage

*Instructions and examples for use:*

  - use ```/auth``` for authentication
   ```
- POST - /auth/login - requires email and password to authenticate a user. 
- POST - /auth/register - registers a user with username, password and username. This automatically creates an API key for the user and returns that.
- login/register endpoints in this route return the user's id, email, access token, api key(when registering)

- GET /me - returns the user's info(id, email and name)

   ```
- use ```/exam``` to get exams and exam checking service
```
Whenever an api request is done to this path, the middleware keyChecker is invoked first to check if the user has a valid API request key.
The API key should be put in the 'request-key' header when trying to make a request.
- If there's no API key, the system responds with 'No API key provided' with a status code of 400.
- If there's an API key provided and is not found/valid, the system responds with 'API request key not found'
- If the API key provided is found in the database, the request is passed onto 'examRoutes' router.
```
```
- Get -  / returns a json list of all subjects.

- If the request is done with a subject parameter like '/:subject' the request is passed unto the 'subjectRoutes' router.

```
- use `/exam/:subject/ `
```
- GET /:year - if the year is between 2005-2010 - it fetches questions of that subject from the year specified from the database.
- POST /:year - checks the answers given by the user

Assuming grade is either 11 or 12,
- GET /:year/:grade - fetches questions of that subject from the year and grade specified from the database.
- POST /:year/:grade - checks the answers given by the user from the questions of that subject, year and grade.

- GET /:year/:grade/:chapter - fetches questions of that subject from the year and grade specified from the database. This selects questions from a single chapter only.
- POST /:year/:grade/:chapter - checks the answers given by the user from the questions of that subject, year and grade.
```
  ## Controllers and system flow
  ### Authentication
  -  `signup/registration`
  ```
  - The user is required to input email, name and password. If any of these is absent, an error is returned.
  - The email is checked if it exists in the database, if it does, an error will be returned.
  - If the above two are alright, a password encrypted hash is generated with `bcrypt` and then the API key is generated with the  `genKey` helper function. At last, the helper function  `genToken` generates an access token and these are returned to the user.
  ```
### Exams
- Assigning parameters
```
- When the route begins with the `subject` path, the system assigns the subject the the req object with `subject` key.
- The year param is also assigned to the year key of the req object.
- If chapter and grade are also present in the request path, they are assigned to chapter and grade keys of the req object respectively.
```
- Fetching of questions
```
A database query object is prepared by using the parameters subject, year, chapter and grade(if present) and then a database call will be executed by the prepared query object.
- getQuestions controller handles this
```
- Checking the answers
```
A similar procedure of fetching the questions based on the path parameter occurs here to filter the questions and answers.
- After the questions are filtered, a hashmap consisting of question ID as a key and question answer as a value is prepared from the entered request parameters.
- After that, by going through every question answer provided by the user, the user's answer is checked against the hashmap and the ID is deleted from the hashmap.
- If the ID is found in the hashmap and the answer is correct, correctAnswers increases by 1, else, incorrectAnswers increases by 1 then the ID is deleted from the hashmap. 
- If the ID is not found in the hashmap, the question is invalid, so invalidQuestions increases by 1.
- If the hashmap is not empty, the number of elements in the hashmap is returned as the number of questions the user did not answer.
- Returning the results
```
  ## License

  MIT License

  ---

  ## Questions?

  <img src="https://avatars.githubusercontent.com/u/59885488?v=4" alt="Heyeman" width="40%" />

  For any questions, please contact me with the information below:

  GitHub: [@Heyeman](https://api.github.com/users/Heyeman)
