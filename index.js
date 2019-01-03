import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { DB, APP_PORT } from './config';

const port = APP_PORT || 4000;

const app = express();

// Connect to database
mongoose.connect(DB, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// Use morgan to log request in dev mode
app.use(logger('dev'))

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Setup a default catch-all route that sends back a welcome message
app.get('/', (req, res) => res.status(200)
  .send({
    message: 'Welcome to the SMS API'
  }));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

export default app;
