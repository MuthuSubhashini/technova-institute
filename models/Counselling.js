const mongoose = require("mongoose");

const counsellingSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  course: String,
  goals: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Counselling", counsellingSchema);
