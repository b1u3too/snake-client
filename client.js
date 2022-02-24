const net = require("net");
const constants = require('./constants');

// establishes a connection with the game server
const connect = function () {
  const conn = net.createConnection({
    host: constants.IP,
    port: constants.PORT
  });

  // interpret incoming data as text
  conn.setEncoding(constants.ENCODING);

  conn.on("data", (data) => {
    console.log(data);
  })

  conn.on("connect", () => {
    console.log("You've successfully connected to the game!");
    conn.write(`Name: ${constants.USERNAME}`);
  })

  return conn;
};

module.exports = { connect };