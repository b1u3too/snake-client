let connection;

// setup interface to handle user input from stdin
const setupInput = function (conn) {
  connection = conn;

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  stdin.on("data", handleUserInput);

  return stdin;
};

const handleUserInput = function(input) {
  const key = input.toLowerCase();   
  const movementBindings = {
    up: 'w',
    left: 'a',
    down: 's',
    right: 'd'
  }
  const chatBindings = {
    howdy: 'h',
    snek: 'e',
    teehee: 't',
    byeeeee: 'b',
  }

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