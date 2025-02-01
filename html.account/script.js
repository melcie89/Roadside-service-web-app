document.getElementById("accountCreationForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent default form submission

  // Collect form data
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;
  const serviceArea = document.getElementById("serviceArea").value.trim();
  const experience = document.getElementById("experience").value.trim();

  let errorMessage = "";

  // General validation
  if (!name) errorMessage += "Name is required.\n";
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errorMessage += "Invalid email format.\n";
  if (password.length < 8) errorMessage += "Password must be at least 8 characters long.\n";
  if (password !== confirmPassword) errorMessage += "Passwords do not match.\n";

  // Service provider validation (Only required if "Service Provider" role is selected)
  if (role === "serviceProvider") {
    if (!serviceArea) errorMessage += "Service Area is required.\n";
    if (!experience) errorMessage += "Experience is required.\n";
  }

  if (errorMessage) {
    alert("Form errors:\n" + errorMessage);
    return;
  }

  // Prepare user data
  const userData = { name, email, password, role };
  if (role === "serviceProvider") {
    userData.serviceArea = serviceArea;
    userData.experience = experience;
  }

  try {
    const response = await fetch("https://roadside-assistance-api-27dbc3c52c31.herokuapp.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Account created successfully!");
      window.location.href = "account.html"; // Redirect user after successful registration
    } else {
      alert("Error: " + result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
});

// Show/Hide Service Provider fields based on role selection
document.getElementById("role").addEventListener("change", function () {
  const serviceProviderFields = document.getElementById("serviceProviderFields");
  if (this.value === "serviceProvider") {
    serviceProviderFields.style.display = "block";
  } else {
    serviceProviderFields.style.display = "none";
  }
});

const API_URL = 'https://roadside-assistance-api-27dbc3c52c31.herokuapp.com';

// Function to request roadside assistance service
const requestService = async (serviceData) => {
  try {
    const response = await fetch(`${API_URL}/v1/service-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData),
    });
    const data = await response.json();
    console.log('Service requested:', data);
    alert("Service request submitted successfully!");
  } catch (error) {
    console.error('Error requesting service:', error);
    alert("Error submitting service request. Please try again.");
  }
};

// Event Listener for Service Request Form Submission
const serviceRequestForm = document.getElementById('serviceRequestForm');
if (serviceRequestForm) {
  serviceRequestForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const serviceData = {
      customerName: event.target.customerName.value,
      customerEmail: event.target.customerEmail.value,
      serviceType: event.target.serviceType.value,
      serviceLocation: event.target.serviceLocation.value,
      additionalDetails: event.target.additionalDetails.value,
    };
    await requestService(serviceData);
  });
}

// Initialize Google Maps
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 }, // Default location: San Francisco
    zoom: 10,
  });
}

// Ensure the Google Maps API initializes correctly
window.initMap = initMap;
