// Initialize the Google Map
let map, marker, geocoder;

// Make initMap globally available
window.initMap = function () {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 12,
  });

  geocoder = new google.maps.Geocoder();

  google.maps.event.addListener(map, "click", function (event) {
    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
    });

    document.getElementById("location").value = `${event.latLng.lat()},${event.latLng.lng()}`;
  });
};

document.addEventListener("DOMContentLoaded", function () {

  async function handleFormSubmit(event, url, requestData, successMessage) {
    event.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const result = await response.json();
        alert(`Error: ${result.message || "Request failed"}`);
        return;
      }

      alert(successMessage);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  /**
   * Service Request Form Submission
   */
  const serviceRequestForm = document.getElementById("serviceRequestForm");
  if (serviceRequestForm) {
    serviceRequestForm.addEventListener("submit", function (event) {
      const requestData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        serviceType: document.getElementById("serviceType").value,
        location: document.getElementById("location").value.trim(),
      };

      if (Object.values(requestData).some((val) => !val)) {
        alert("All fields are required.");
        return;
      }

      handleFormSubmit(
        event,
        "https://roadside-assistance-api-27dbc3c52c31.herokuapp.com/api/v1/service/request",
        requestData,
        "Service request submitted successfully!"
      );
    });
  }

  /**
 * Account Creation Form Submission
 */
const accountCreationForm = document.getElementById("accountCreationForm");
if (accountCreationForm) {
  accountCreationForm.addEventListener("submit", function (event) {
    // Update the requestData to match the new format
    const requestData = {
      name: document.getElementById("firstName").value.trim() + " " + document.getElementById("lastName").value.trim(), // Combine first and last name
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      role: "Admin", // Static role value, can be updated if dynamic
    };

    let errors = [];
    if (!requestData.name) errors.push("Name is required.");
    if (!requestData.email) errors.push("Email is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestData.email)) errors.push("Invalid email format.");
    if (requestData.password.length < 8) errors.push("Password must be at least 8 characters long.");

    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }

    handleFormSubmit(
      event,
      "https://roadside-assistance-api-27dbc3c52c31.herokuapp.com/api/v1/auth/register",
      requestData,
      "Account created successfully!"
    );
  });
}


  /**
   * Login Form Submission
   */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      const requestData = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
      };

      if (!requestData.email || !requestData.password) {
        alert("Both email and password are required.");
        return;
      }

      handleFormSubmit(
        event,
        "https://roadside-assistance-api-27dbc3c52c31.herokuapp.com/api/v1/auth/login",
        requestData,
        "Login successful! Redirecting..."
      ).then(() => {
        localStorage.setItem("accessToken", requestData.accessToken);
        localStorage.setItem("refreshToken", requestData.refreshToken);
        window.location.href = "/dashboard";
      });
    });
  }

  /**
   * Contact Us Form Submission
   */
  const contactUsForm = document.getElementById("contactUsForm");
  if (contactUsForm) {
    contactUsForm.addEventListener("submit", function (event) {
      const requestData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim(),
      };

      if (Object.values(requestData).some((val) => !val)) {
        alert("All fields are required.");
        return;
      }

      handleFormSubmit(
        event,
        "https://roadside-assistance-api-27dbc3c52c31.herokuapp.com/api/v1/contact",
        requestData,
        "Message sent successfully!"
      );
    });
  }
});
