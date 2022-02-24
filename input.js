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

  if (key === '\u0003') {
    process.exit();
  }

  for (const direction in movementBindings) {
    if (movementBindings[direction] === (key)) {
      connection.write(`Move: ${direction}`);
    }
  }
};

module.exports = {
  setupInput
};