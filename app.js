const express = require('express');
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
const path = require('path');

// eslint-disable-next-line no-undef
const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

app.listen(PORT, (error) => {
  error
    ? console.error('Error: ' + error)
    : console.log(`Connecting to ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(createPath('index'));
});
app.get('/contacts', (req, res) => {
  res.sendFile(createPath('contacts'));
});
app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

// Middleware
app.use((req, res) => {
  res.status(404).sendFile(createPath('error'));
});
