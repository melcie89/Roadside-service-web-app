// Initialize the Google Map
let map;
let marker;
let geocoder;

function initMap() {
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
}

document.addEventListener("DOMContentLoaded", function () {

  // Service Request Form Submission
  document.getElementById("serviceRequestForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const serviceType = document.getElementById("serviceType").value;
    const location = document.getElementById("location").value.trim();

    if (!firstName || !lastName || !serviceType || !location) {
      alert("All fields are required.");
      return;
    }

    const requestData = { firstName, lastName, serviceType, location };

    try {
      const response = await fetch("https://roadside-assistance-api-27dbc3c52c31.herokuapp.com/api/v1/service/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });
      const result = await response.json();
      alert("Service request submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting service request.");
    }
  });

  // Live Chat functionality
  const chatHistory = document.getElementById("chat-history");
  const chatInput = document.getElementById("chat-input");
  const sendChatButton = document.getElementById("send-chat");

  sendChatButton.addEventListener("click", async function () {
    const message = chatInput.value.trim();
    if (message) {
      // Display the message in chat history
      const chatMessage = document.createElement("div");
      chatMessage.textContent = message;
      chatHistory.appendChild(chatMessage);

      // Clear the input
      chatInput.value = "";

      // Scroll to the bottom of the chat
      chatHistory.scrollTop = chatHistory.scrollHeight;

      // Send the chat message to the Heroku live chat API
      const chatData = {
        message: message,
        timestamp: new Date().toISOString(), // Optional timestamp for message
      };

      try {
        const response = await fetch("https://roadside-assistance-api-27dbc3c52c31.herokuapp.com/api/v1/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chatData),
        });

        if (response.ok) {
          console.log("Message sent to live chat API!");
        } else {
          throw new Error("Failed to send message to live chat API");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error sending message to the server.");
      }
    }
  });

  // Account Creation Form
  document.getElementById("accountCreationForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let errorMessage = "";

    if (!firstName || !lastName) errorMessage += "First and last name are required.\n";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errorMessage += "Invalid email format.\n";
    if (password.length < 8) errorMessage += "Password must be at least 8 characters long.\n";
    if (password !== confirmPassword) errorMessage += "Passwords do not match.\n";

    if (errorMessage) {
      alert("Form errors:\n" + errorMessage);
      return;
    }

    const userData = { firstName, lastName, email, password };

    try {
      const response = await fetch("https://roadside-assistance-api-27dbc3c52c31.herokuapp.com/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      const result = await response.json();
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating account.");
    }
  });

  // Contact Us Form
  document.getElementById("contactUsForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!firstName || !lastName || !email || !subject || !message) {
      alert("All fields are required.");
      return;
    }

    const contactData = { firstName, lastName, email, subject, message };

    try {
      const response = await fetch("https://roadside-assistance-api-27dbc3c52c31.herokuapp.com/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      });
      const result = await response.json();
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message.");
    }
  });

});
