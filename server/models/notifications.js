const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: String,
  text: String
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);