const fs = require('fs');
fs.readFile('./test.txt', (err, data) => {
  if (err) throw err;

  fs.mkdir('./files', () => {
    fs.writeFile('./files/test2.txt', `New text: ${data}`, (error) => {
      if (error) console.error(error);
    });
  });
});

setTimeout(() => {
  if (fs.existsSync('./files/test2.txt')) {
    fs.unlink('./files/test2.txt', () => {});
  }
}, 4000);
setTimeout(() => {
  fs.rmdir('./files', () => {});
}, 6000);

console.log('Sup boiz');
