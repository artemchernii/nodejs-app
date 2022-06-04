const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  error
    ? console.error('Error: ' + error)
    : console.log(`Connecting to ${PORT}`);
});
