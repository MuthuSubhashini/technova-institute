module.exports = (name, course) => {
  return `
  <div style="background:#0f0f0f;padding:20px;border-radius:12px;color:#fff;font-family:Arial">
    <h2 style="color:#b388ff">🎉 Registration Successful!</h2>

    <p>Hi <b>${name}</b>,</p>

    <p>Thank you for your interest in <b>${course}</b> at <b>TechNova Institute</b>.</p>

    <h3>📘 COURSE DETAILS</h3>
    <ul>
      <li><b>Course:</b> ${course}</li>
    </ul>

    <h3>📚 CURRICULUM</h3>
    <ul>
      <li>HTML, CSS & JavaScript</li>
      <li>Modern Frameworks</li>
      <li>Industry Projects</li>
      <li>Placement Support</li>
    </ul>

    <p>📞 Our team will contact you shortly.</p>

    <br>
    <p>Regards,<br><b>TechNova Institute</b></p>
  </div>
  `;
};
