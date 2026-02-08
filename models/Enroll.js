const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  course: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enroll", EnrollSchema);
