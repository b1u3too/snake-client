let connection;
const constants = require('./constants');

// setup interface to handle user input from stdin
const setupInput = function(conn) {
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
  const movementBindings = constants.MOVEMENT_BINDINGS;
  const chatBindings = constants.CHAT_BINDINGS;

  //if keypress is ctrl+c, exit process
  if (key === '\u0003') {
    process.exit();
  }

  //if keypresses are bound to move or chat bindings, send to server
  checkBindings(movementBindings, key, "Move");
  checkBindings(chatBindings, key, "Say");

};

//helper function to send items bound to server commands to the server
const checkBindings = function(bindingsObject, input, serverKeyword) {
  for (const property in bindingsObject) {
    if (bindingsObject[property] === input) {
      connection.write(serverKeyword + ": " + property);
    }
  }
};

module.exports = {
  setupInput
};