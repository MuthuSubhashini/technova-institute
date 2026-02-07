document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  // Prevent errors on other pages
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      course: this.course.value,
      message: this.message.value
    };

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        alert("Submission failed ❌");
        return;
      }

      // Download PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "TechNova_Enquiry.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      alert("Form submitted successfully ✅");
      form.reset();

    } catch (err) {
      console.error(err);
      alert("submitted");
    }
  });
});
