require("dotenv").config(); // load .env variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const { log } = require("mercedlogger"); // import mercedlogger's log function
const cors = require("cors"); // import cors
const UserRouter = require("./controllers/User"); //import User Routes
const ProfileRouter = require("./controllers/Profile"); // import Profile Routes

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const { PORT = 3000 } = process.env;

// Create Application Object
const app = express();

// GLOBAL MIDDLEWARE
app.use(cors()); // add cors headers
app.use(morgan("tiny")); // log the request for debugging
app.use(express.json()); // parse json bodies

// ROUTES AND ROUTES
app.get("/", (req, res) => {
  res.send("this is the test route to make sure server is working");
});

app.use("/user", UserRouter); // send all "/user" requests to UserRouter for routing
app.use("/profile", ProfileRouter); // send all "/profile" request to ProfileROuter

// APP LISTENER
app.listen(PORT, "0.0.0.0", () =>
  log.green("SERVER STATUS", `Listening on port ${PORT}`)
);
