process.env.NODE_ENV = 'development';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { devDB, APP_PORT, testDB } from './config';
import routes from './routes'

dotenv.config();

const port = APP_PORT || 4000;

const app = express();
let mongoDB;

if (process.env.NODE_ENV === 'test') {
  mongoDB = testDB;
} else if (process.env.NODE_ENV === 'development') {
  mongoDB = devDB;
}

// Connect to database
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error',
  console.error.bind(console, 'MONGODB connection failed in this instance'));

// Use morgan to log request in dev mode
app.use(logger('dev'))

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app);

// Setup a default catch-all route that sends back a welcome message
app.get('/', (req, res) => res.status(200)
  .send({
    message: 'Welcome to the SMS API'
  }));

app.use('*', (req, res) =>
  res.send({
    message: 'The API route you requested does not exist'
  }));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

export default app;
