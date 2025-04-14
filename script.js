// Smooth scroll for navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Handle form submission
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const mobile = document.querySelector("#mobile").value;
  const location = document.querySelector("#location").value; // Directly get the location value from the input

  if (!name || !mobile || !location) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const res = await fetch("https://au-backend-3.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        mobile_number: mobile,
        location,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      alert(result.message || "Details submitted successfully!");
    } else {
      alert(result.message || "Submission failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during submission:", error);
    alert("An error occurred while submitting the form.");
  }
});
