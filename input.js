let connection;
const constants = require('./constants');

// setup interface to handle user input from stdin
const setupInput = function (conn) {
  connection = conn;

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding(constants.ENCODING);
  stdin.resume();

  stdin.on("data", handleUserInput);

  return stdin;
};

const handleUserInput = function(input) {
  const key = input.toLowerCase();   
  console.log(`key pressed: ${key}`);
  const movementBindings = constants.MOVEMENT_BINDINGS;
  const chatBindings = constants.CHAT_BINDINGS;

  if (key === '\u0003') {
    process.exit();
  }

  for (const direction in movementBindings) {
    if (movementBindings[direction] === key) {
      connection.write(`Move: ${direction}`);
    }
  }

  for (const message in chatBindings) {
    if (chatBindings[message] === key) {
      connection.write(`Say: ${message}`);
    }
  }
};

module.exports = {
  setupInput
};