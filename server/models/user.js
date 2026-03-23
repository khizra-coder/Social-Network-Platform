const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profilePic: String,
  friends: [String],
  friendRequests: [String]
});

module.exports = mongoose.model("User", UserSchema);