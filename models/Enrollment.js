const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  course: String,
  message: String,
  pdfFile: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enquiry", EnquirySchema);
