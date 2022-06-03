const { EventEmitter } = require('stream');

class Logger extends EventEmitter {
  log(msg) {
    console.log(msg);
    this.emit('some_event', { id: 2, text: 'Artem is the best' });
  }
}

module.exports = { Logger };
