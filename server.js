const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

// ✅ FIXED MODEL PATHS (removed /models/)
const Counselling = require("./Counselling");
const Enquiry = require("./Enrollment");
const Enroll = require("./Enroll");

const app = express();

// ✅ FIXED PORT FOR RENDER
const PORT = process.env.PORT || 5000;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

/* ================= MONGODB ================= */
mongoose
  .connect(
    "mongodb+srv://db_form:admin12345@cluster0.mnpggu1.mongodb.net/technova-institute"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ================= EMAIL CONFIG ================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "muthusubhashini02@gmail.com",
    pass: "leaj ndfk fsxj uwtd"
  }
});

/* ================= CONTACT API ================= */
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    const pdfDir = path.join(__dirname, "pdfs");
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

    const fileId = uuidv4();
    const pdfPath = path.join(pdfDir, `${fileId}.pdf`);

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);
    doc.fontSize(20).text("TechNova Institute - Enquiry", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${phone}`);
    doc.text(`Course: ${course}`);
    doc.moveDown();
    doc.text(`Message: ${message || "N/A"}`);
    doc.end();

    writeStream.on("finish", async () => {
      await Enquiry.create({
        name,
        email,
        phone,
        course,
        message,
        pdfFile: `${fileId}.pdf`
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=TechNova_Enquiry.pdf"
      );

      fs.createReadStream(pdfPath).pipe(res);
    });

  } catch (error) {
    console.error("❌ CONTACT ERROR:", error);
    res.status(500).send("Submit failed");
  }
});

/* ================= ENROLL API ================= */
app.post("/api/enroll", async (req, res) => {
  try {
    const { name, email, phone, courseName } = req.body;

    await transporter.sendMail({
      from: "TechNova Institute <muthusubhashini02@gmail.com>",
      to: email,
      subject: "Enrollment Successful - TechNova",
      html: `
        <h2>Enrollment Successful 🎉</h2>
        <p>Hi ${name},</p>
        <p>You are successfully enrolled in:</p>
        <b>${courseName}</b>
        <p>We will contact you shortly.</p>
        <br>
        <p>Regards,<br>TechNova Institute</p>
      `
    });

    res.json({ success: true });

  } catch (error) {
    console.error("ENROLL ERROR:", error);
    res.status(500).json({ success: false });
  }
});

/* ================= COUNSELLING API ================= */
app.post("/api/counselling", async (req, res) => {
  try {
    let { name, email, mobile, course, goals } = req.body;

    if (!name) {
      const v = Object.values(req.body);
      [name, email, mobile, course, goals] = v;
    }

    await new Counselling({
      name,
      email,
      mobile,
      course,
      goals
    }).save();

    res.send(`
      <h2>✅ Counselling Booked Successfully</h2>
      <a href="/free-counselling.html">Go Back</a>
    `);

  } catch (err) {
    console.error("❌ COUNSELLING ERROR:", err);
    res.status(500).send("Server Error");
  }
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
