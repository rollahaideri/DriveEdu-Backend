const io = require("socket.io-client");

const socket = io("http://localhost:4000"); // replace with your server url

socket.on("connect", () => {
  console.log(`Connected with id: ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});