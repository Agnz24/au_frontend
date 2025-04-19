// Smooth scroll for navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

let userLocation = "";

// Request geolocation on page load
function requestLocationPermission() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        userLocation = `${latitude}, ${longitude}`; // lat,lng string
        alert("Location access granted: " + userLocation);
      },
      (error) => {
        alert("Location access denied. Please allow location access.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
window.onload = requestLocationPermission;

// Handle form submission
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name  = document.querySelector("#name").value.trim();
  const mobile = document.querySelector("#mobile").value.trim();

  if (!userLocation) {
    alert("Location not available. Please allow location permission.");
    return;
  }

  try {
    const res = await fetch("https://au-backend-1.onrender.com/submit", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name, mobile_number: mobile, location: userLocation })
    });

    if (res.ok) {
      alert("✅ Details submitted successfully!");
      form.reset();
    } else {
      const err = await res.json();
      console.error("Server error:", err);
      alert("❌ Submission failed. " + (err.message || "Please try again."));
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("An error occurred while submitting the form.");
  }
});
