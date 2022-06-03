const { Logger } = require('./log');

const logger = new Logger();

logger.on('some_event', (args) => {
  const { id, text } = args;
  console.log(text);
  console.log('id', id);
});

logger.emit('some_event', { id: 999, text: '123123123' });
logger.log('Hello world');
