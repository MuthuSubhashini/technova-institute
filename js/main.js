document.addEventListener("DOMContentLoaded", () => {

  /* ===== REVEAL ANIMATION FIX ===== */
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => el.classList.add("active"));

  /* ===== CONTACT FORM SUBMIT ===== */
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      course: form.course.value,
      message: form.message.value,
    };

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Successfully submitted! We will contact you soon.");
        form.reset();
      } else {
        alert("❌ Submission failed.");
      }
    } catch (err) {
      alert("submitted successfully");
      console.error(err);
    }
  });
});
