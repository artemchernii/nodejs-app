/* eslint-disable no-undef */
const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const morgan = require('morgan');

app.set('view engine', 'ejs');

const createPath = (page) =>
  path.resolve(__dirname, 'ejs-views', `${page}.ejs`);
app.listen(PORT, (error) => {
  error
    ? console.error('Error: ' + error)
    : console.log(`Connecting to ${PORT}`);
});
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
// Routes
app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});
app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'youtube', link: 'https://www.youtube.com/' },
    { name: 'twitter', link: 'https://www.twitter.com/' },
    { name: 'github', link: 'https://www.github.com/' },
  ];
  res.render(createPath('contacts'), { contacts, title });
});
app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});
app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body;
  const post = {
    id: new Date(),
    date: new Date().toLocaleDateString(),
    title,
    author,
    text,
  };
  res.render(createPath('post'), { post, title });
});
app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
});
app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  const post = {
    id: '1',
    title: 'Post 1',
    text: 'This is the body of post 1',
    date: '2020-01-01',
    author: 'John Doe',
  };
  res.render(createPath('post'), { title, post });
});
app.get('/posts', (req, res) => {
  const title = 'Posts';
  const posts = [
    {
      id: '1',
      title: 'Post 1',
      text: 'This is the body of post 1',
      date: '2020-01-01',
      author: 'John Doe',
    },
    {
      id: '2',
      title: 'Post 2',
      text: 'This is the body of post 2',
      date: '2020-01-02',
      author: 'Bereza',
    },
  ];
  res.render(createPath('posts'), { title, posts });
});
// Middleware
app.use((req, res) => {
  const title = '404';
  res.status(404).render(createPath('error'), { title });
});
