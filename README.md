# Clean Architecture Microservice API

Microservice structure based on DevMastery's video and Bob Martin's Clean Architecture

#### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node JS](https://nodejs.org/en/)
- [Mongo DB](https://www.mongodb.com) (To use the Mongo DB interface as shown in the Mastery Monday youtube video, you need to install Mongo Compass)

#### 1. Clone the repo and install dependencies

```bash
git clone
cd comments-api
npm i
```

#### 2. Modify the .env file

Save `.env.example` as `.env` and then add your database.

#### 3. Startup your MongoDB

Usually this is just: `mongod` on the command line.

#### 4. Start the server

To run in production mode where code is transpiled by Babel into a `dist` folder and run directly in `node`:

```bash
npm start
```

To run in development mode where code is run by [babel-node](https://babeljs.io/docs/en/babel-node) via [nodemon](https://nodemon.io) and re-transpiled any time there is a change:

```bash
npm run dev
```
