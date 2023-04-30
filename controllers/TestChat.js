const { log } = require("mercedlogger");

const socketIo = require("socket.io");

 const testSocketConnection = function (socketIo) {
  socketIo.on("connection", (socket) => {
   console.log("Socket connected:", socket.id);
    log.green("SOCKET.IO", "New connection established");

    socket.on("disconnect", () => {
      log.yellow("SOCKET.IO", "A connection disconnected");
    });

    socket.on("chat-message", (message) => {
      log.cyan("SOCKET.IO", `Received chat message: ${message}`);

      // broadcast message to all connected sockets
      socketIo.emit("chat-message", message);
    });
  });
};


module.exports = testSocketConnection;
