const { Schema, model } = require("../db/connection"); // import Schema & model

// Chat Schema
const ChatSchema = new Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  
});

// Chat model
const Chat = model("Chat", ChatSchema);

module.exports = Chat;