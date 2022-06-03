const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log('Server request');
  console.log('req url =>', req.url);
  console.log('req method =>', req.method);
  res.setHeader('Content-Type', 'text/html');
  res.write(`<h1>Hello World</h1>`);
  res.write(`<p>${req.url}</p>`);
  res.end();

  /* API simulation :)  
      res.setHeader('Content-Type', 'application/json');
    const data = JSON.stringify([
      { name: 'John', age: 30 },
      { name: 'Mary', age: 25 },
    ]);
    res.end(data); */
});

server.listen(PORT, 'localhost', (error) => {
  error
    ? console.log('error', error)
    : console.log(`Server is listening on port ${PORT}`);
});
