const { Schema, model } = require("../db/connection"); // import Schema & model

// Profile Schema
const ProfileSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  drivingLicense: { type: String, required: true },
  carModel: { type: String, required: true },
  
});

// Profile model
const Profile = model("Profile", ProfileSchema);

module.exports = Profile;
