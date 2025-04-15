let userLocation = "";

// Request user location
function requestLocationPermission() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        userLocation = `${latitude},${longitude}`;
        console.log("Location access granted:", userLocation);
        alert("Location access granted.");
      },
      (error) => {
        console.warn("Location access denied:", error.message);
        alert("Please allow location access for accurate registration.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Run after DOM fully loads
document.addEventListener("DOMContentLoaded", () => {
  requestLocationPermission();

  // Smooth scroll
  document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  const form = document.querySelector("#register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const mobile = document.querySelector("#mobile").value.trim();

    if (!name || !mobile) {
      alert("Please fill in all fields.");
      return;
    }

    if (!userLocation) {
      alert("Location not available. Please allow location permission.");
      return;
    }

    try {
      const res = await fetch("https://au-backend-1.onrender.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mobile_number: mobile,
          location: userLocation,
        }),
      });

      if (res.ok) {
        alert("Details submitted successfully!");
        form.reset();
      } else {
        const errorData = await res.json();
        alert("Submission failed: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  });
});
