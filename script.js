let userLocation = "";

// Request location when website is in use
function getUserLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        userLocation = `${latitude},${longitude}`;
        console.log("Location acquired:", userLocation);
        alert("Thanks! Location access granted.");
      },
      (error) => {
        console.warn("Location denied:", error.message);
        alert("Please allow location access for full functionality.");
      }
    );
  } else {
    alert("Your browser doesn't support location services.");
  }
}

// Run after page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  getUserLocation();

  // Smooth scroll navigation
  document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Handle form submission
  const form = document.getElementById("register-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    if (!name || !mobile) {
      alert("Please fill in all fields.");
      return;
    }

    if (!userLocation) {
      alert("Location not yet available. Please allow permission.");
      return;
    }

    try {
      const response = await fetch("https://au-backend-1.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile_number: mobile,
          location: userLocation
        }),
      });

      if (response.ok) {
        alert("✅ Registered successfully!");
        form.reset();
      } else {
        const data = await response.json();
        alert("❌ Submission failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Form submission error:", err);
      alert("An error occurred while submitting. Please try again.");
    }
  });
});
