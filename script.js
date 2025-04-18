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

// Request location
function requestLocationPermission() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        userLocation = `${latitude}, ${longitude}`;
        alert("Location access granted.");
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

// Form submission
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const mobile = document.querySelector("#mobile").value.trim();

  if (!userLocation) {
    alert("Location not available. Please allow location permission.");
    return;
  }

  try {
    const res = await fetch("https://au-backend-2.onrender.com/submit", {
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
      alert("✅ Details submitted successfully!");
      form.reset();
    } else {
      alert("❌ Submission failed. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while submitting the form.");
  }
});
