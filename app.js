const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./docs/text.txt');
const writeSteam = fs.createWriteStream('./docs/new-text.txt');
const compressStream = zlib.createGzip();

// readStream.on('data', (chunk) => {
//   writeSteam.write('\n ---Chunk Start---\n');
//   writeSteam.write(chunk);
//   writeSteam.write('\n ---Chunk End---\n');
// });

const handleError = () => {
  console.log('error');
  readStream.destroy();
  writeSteam.end('Finished with error...');
};

readStream
  .on('error', handleError)
  .pipe(compressStream)
  .pipe(writeSteam)
  .on('error', handleError);
