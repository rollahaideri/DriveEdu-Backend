const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { Schema } = mongoose;

// Define the schema for the submitted chat message
const SubmittedChatMessageSchema = new Schema({
  message: {
    type: String,
    required: true
  }
});

// Define the schema for the receiving chat message
const ReceivingChatMessageSchema = new Schema({
  fromUsername: { type: String, required: true },
  username: { type: String, required: true },
    id: {
        type: String,
    default: uuidv4,
        required: true,
        unique: true
      },
    date: {
      type: Date,
      default: Date.now
    },
    
    message: {
      type: String,
      required: true
    }
  },
  //  {
  //   // set _id to false to exclude it from the schema
    // _id: false 
  // }
  );

// Create the Mongoose models for the schemas
const SubmittedChatMessage = mongoose.model(
  "SubmittedChatMessage",
  SubmittedChatMessageSchema
);

const ReceivingChatMessage = mongoose.model(
  "ReceivingChatMessage",
  ReceivingChatMessageSchema
);

// Export the models
module.exports = {
    SubmittedChatMessage,
    ReceivingChatMessage
};