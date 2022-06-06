/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const chalk = require('chalk');
require('dotenv').config();

const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const postApiRoutes = require('./routes/api-post-routes');
const createPath = require('./helpers/create-path');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();
const PORT = process.env.PORT;

// DB Config (MongoDB)
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;
const db = `mongodb+srv://artemchernii:${PASSWORD}@cluster-node-js-course.qlm9zua.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// Listen for connections
app.listen(PORT, (error) => {
  error
    ? console.error(errorMsg('Error: ' + error))
    : console.log(successMsg(`Connecting to ${PORT}`));
});

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log(successMsg('Connected to MongoDB'), res.Collection.dbName);
  })
  .catch((err) => {
    console.log(errorMsg('Error: ', err));
  });

// Setup ejs engine
app.set('view engine', 'ejs');
// Setup morgan logger
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('styles'));
// Try middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// Method override middleware
app.use(methodOverride('_method'));
// Index route
app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});
// Posts and contacts routes
app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);
// Handle wrong routes
app.use((req, res) => {
  const title = 'Something went wrong';
  res.status(404).render(createPath('error'), { title });
});
