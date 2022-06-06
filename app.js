/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;
const path = require('path');
// Models
const Post = require('./models/post');
const Contact = require('./models/contact');
const Name = require('./models/name');
// DB Config
const PASSWORD = 'ronaldo7artem';
const DB_NAME = 'node-blog';
const db = `mongodb+srv://artemchernii:${PASSWORD}@cluster-node-js-course.qlm9zua.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
// Setup ejs engine
app.set('view engine', 'ejs');
// Create path to public folder (dynamic for all platforms)
const createPath = (page) =>
  path.resolve(__dirname, 'ejs-views', `${page}.ejs`);
app.listen(PORT, (error) => {
  error
    ? console.error('Error: ' + error)
    : console.log(`Connecting to ${PORT}`);
});
// Setup morgan logger
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('styles'));
app.use(express.static('images'));
app.use(express.static('scripts'));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(methodOverride('_method'));
// Routes
app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});
app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  Contact.find()
    .then((contacts) => {
      console.log('Contacts: ', contacts);
      res.render(createPath('contacts'), { title, contacts });
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath('error'), { title: 'Error' });
    });
});
app.get('/names', (req, res) => {
  Promise.all([Contact.find(), Name.find()])
    .then(([contacts, names]) => {
      console.log('Contacts: ', contacts);
      console.log('Names: ', names);
      res.render(createPath('names'), { title: 'Names', contacts, names });
    })
    .catch((err) => console.log(err));
});
app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});
app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => {
      res.redirect('/posts');
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.render(createPath('error'), { title: 'Error' });
    });
});
app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
});
app.get('/edit/:id', (req, res) => {
  const title = 'Edit Post';
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath('edit-post'), { title, post });
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.render(createPath('error'), { title: 'Error' });
    });
});
app.put('/edit/:id', (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, author, text })
    .then((post) => {
      res.redirect(`/posts/${id}`);
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.render(createPath('error'), { title: 'Error' });
    });
});
app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  Post.findById(req.params.id)
    .then((post) => {
      res.render(createPath('post'), { title, post });
    })
    .catch((error) => {
      console.log('Error: ', error);
      res.render(createPath('error'), { title: 'Error' });
    });
});
app.delete('/posts/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath('error'), { title: 'Error' });
    });
});
app.get('/posts', (req, res) => {
  const title = 'Posts';
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render(createPath('posts'), { title, posts });
    })
    .catch((error) => {
      console.log('Error: ', error);
      res.render(createPath('error'), { title: 'Error' });
    });
});
// Middleware
app.use((req, res) => {
  const title = '404';
  res.status(404).render(createPath('error'), { title });
});
