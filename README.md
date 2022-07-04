# REST API for EUEE

  ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/heyeman/alx-backend_project?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/
last-commit/heyeman/alx-backend_project?style=flat&logo=appveyor)

  Check out the badges hosted by [shields.io](https://shields.io/).


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
  ```Server listening to port 5000
MySQL with Prisma connected
Database connected successfully```

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
|—— trial.js
```

## Usage

*Instructions and examples for use:*

  - use ```/auth`` for authentication
  ## License

  MIT License

  ---

  ## Questions?

  <img src="https://avatars.githubusercontent.com/u/59885488?v=4" alt="Heyeman" width="40%" />

  For any questions, please contact me with the information below:

  GitHub: [@Heyeman](https://api.github.com/users/Heyeman)
