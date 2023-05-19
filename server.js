require("dotenv").config(); // load .env variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const { log } = require("mercedlogger"); // import mercedlogger's log function
const cors = require("cors"); // import cors
const UserRouter = require("./controllers/User"); //import User Routes
const ProfileRouter = require("./controllers/Profile"); // import Profile Routes
const ChatRouter = require("./controllers/Chat"); // import Chat Routes
const { isLoggedIn } = require("./controllers/middleware"); // import custom middleware
const User = require("./models/User") ;

const { SubmittedChatMessage, ReceivingChatMessage } = require("./models/Chat");

const http = require("http"); // import http module
const { Server } = require("socket.io"); // import socket.io
const { v4: uuidv4 } = require("uuid");
const WebSocket = require("ws");
const jwt = require("jsonwebtoken");

const wss = new WebSocket.Server({ port: 8080 });



wss.on("connection", (socket, req) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.SECRET);
      if (payload) {
        socket.user = payload;
        console.log("User authenticated:", payload.username);
        var socketId = payload.username;
  console.log(`New socket connection: ${socketId}`);
      }
    } catch (error) { 
      console.log(error);
    } 
  
  // const { username } = socket.user;
  

  socket.on("message",  (message) => {
    console.log(`Message received: ${message}`);
    const messageObj = JSON.parse(message);
    const to = messageObj.to;

    ReceivingChatMessage.create({   
      fromUsername: socketId,
      username: to,
      id: uuidv4(),
      message: messageObj.message,
      date: Date.now(),
    });
    // const {username} = socket.user;
    const chatMessage = new ReceivingChatMessage({
       username: to,
      id: uuidv4(),
      message: messageObj.message,
      date: Date.now(),
    });

    wss.clients.forEach((client) => {
      client.send(JSON.stringify(chatMessage));
    });
    
    
    // socket.send(JSON.stringify(chatMessage));
    socket.send(JSON.stringify(chatMessage));
    console.log(`Message sent: ${chatMessage}`)
  });

  socket.on("close", () => {
    console.log(`Socket disconnected: ${socket._socket.remoteAddress}`);
  } );
} else {
  console.log("No auth header");
}
});    
  






//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const { PORT = 3000 } = process.env;

// Create Application Object
const app = express();
// const server = http.createServer(app); // create a http server instance
// const io = new Server(server); // create a socket.io server instance and pass it the http server instance

// GLOBAL MIDDLEWARE
app.use(cors()); // add cors headers
app.use(morgan("tiny")); // log the request for debugging
app.use(express.json()); // parse json bodies

// ROUTES AND ROUTES
app.get("/", (req, res) => {
  res.send("this is the test route to make sure server is working");
});
app.post("/", isLoggedIn, async (req, res) => {
  // Your route handler logic here
});
app.use("/user", UserRouter); // send all "/user" requests to UserRouter for routing
app.use("/profile", ProfileRouter); // send all "/profile" request to ProfileROuter
app.use("/chat", ChatRouter); // send all "/chat" request to ChatRouter 

// SOCKET.IO EVENT LISTENERS
// io.on("connection", (socket) => {
//   console.log(`New socket connection: ${socket.id}`);
// });

// io.on("disconnect", (socket) => {
//   console.log(`Socket disconnected: ${socket.id}`);
// });

// APP LISTENER
app.listen(PORT, "0.0.0.0", () =>
  log.green("SERVER STATUS", `Listening on port ${PORT}`)
);

wss.on("listening", () => {
  log.green("WSS SERVER STATUS", `Listening on port 8080`);
});
