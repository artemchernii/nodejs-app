const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');

const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();
const PORT = 3000;

// DB Config
const PASSWORD = 'ronaldo7artem';
const DB_NAME = 'node-blog';
const db = `mongodb+srv://artemchernii:${PASSWORD}@cluster-node-js-course.qlm9zua.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// Listen for connections
app.listen(PORT, (error) => {
  error
    ? console.error('Error: ' + error)
    : console.log(`Connecting to ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log('Connected to MongoDB', res.Collection.dbName);
  })
  .catch((err) => {
    console.log('Error: ', err);
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
// Handle wrong routes
app.use((req, res) => {
  const title = '404';
  res.status(404).render(createPath('error'), { title });
});
