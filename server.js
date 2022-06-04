const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

app.listen(PORT, (error) => {
  error
    ? console.error('Error: ' + error)
    : console.log(`Connecting to ${PORT}`);
});

app.get('/', (req, res) => {
  console.log('request', req);
  res.sendFile(createPath('index'));
});
app.get('/contacts', (req, res) => {
  console.log('request', req);
  res.sendFile(createPath('contacts'));
});
app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

// Middleware
app.use((req, res) => {
  res.status(404).sendFile(createPath('error'));
});
