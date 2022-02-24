// setup interface to handle user input from stdin
const setupInput = function () {
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
  console.log("key pressed: ", key);

  if (key === '\u0003') {
    process.exit();
  }

  for (const direction in movementBindings) {
    if (movementBindings[direction] === (key)) {
      console.log(`SENDING: Move: ${direction}`);
      return `Move: ${direction}`;
    }
  }
};

module.exports = {
  setupInput
};