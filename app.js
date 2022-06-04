const http = require('http');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

const server = http
  .createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    const createPath = (page) =>
      path.resolve(__dirname, 'views', `${page}.html`);
    let basePath = '';
    console.log(__dirname);

    switch (req.url) {
      case '/':
      case '/index.html':
      case '/home':
      case '/home.html':
        basePath = createPath('index');
        res.statusCode = 200;
        break;
      case '/about-us':
        res.statusCode = 301;
        res.setHeader('Location', '/contacts');
        res.end();
      case '/contacts':
        basePath = createPath('contacts');
        res.statusCode = 200;
        break;
      default:
        basePath = createPath('error');
        res.statusCode = 404;
        break;
    }

    fs.readFile(basePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        console.error(err);
        res.end();
      }
      if (data) {
        res.write(data);
        res.end();
      }
    });
  })
  .listen('3000', 'localhost', (error) => {
    error
      ? console.log('something bad happened', error)
      : console.log(`server is listening on port ${PORT}`);
  });
