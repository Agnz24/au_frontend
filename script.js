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

// Request location when page loads
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

// Handle form submission
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const mobile = document.querySelector("#mobile").value;

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
        name, mobile_number: mobile, location: userLocation // Use userLocation instead of location
      }),
    });

    if (res.ok) {
      alert("Details submitted successfully!");
    } else {
      alert("Submission failed. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while submitting the form.");
  }
});
