// Handle the form submission and validation
document.getElementById("accountCreationForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting
  
  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;
  
  // Validation flags
  let isValid = true;
  let errorMessage = "";
  
  // Name validation
  if (name === "") {
    isValid = false;
    errorMessage += "Name is required.\n";
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    isValid = false;
    errorMessage += "Invalid email format.\n";
  }

  // Password validation
  if (password.length < 8) {
    isValid = false;
    errorMessage += "Password must be at least 8 characters long.\n";
  }
  if (password !== confirmPassword) {
    isValid = false;
    errorMessage += "Passwords do not match.\n";
  }
  
  // Show error or success message
  if (!isValid) {
    alert("Form errors:\n" + errorMessage);
  } else {
    alert("Account created successfully!");

    // Optional: Save to localStorage (for testing)
    const userData = { name, email, role };
    localStorage.setItem("userAccount", JSON.stringify(userData));

    // Clear form
    this.reset();
  }
});

// Toggle the display of service provider fields based on the selected role
document.getElementById('role').addEventListener('change', function() {
  const role = this.value;
  const serviceProviderFields = document.getElementById('serviceProviderFields');
  
  if (role === 'serviceProvider') {
    serviceProviderFields.style.display = 'block';
  } else {
    serviceProviderFields.style.display = 'none';
  }
});

// Initialize Google Map
function initMap() {
  const location = { lat: 32.9096, lng: -117.2432 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: location,
  });
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

// Load map after the window has loaded
window.onload = initMap;




document.addEventListener("DOMContentLoaded", () => {
  const liveChat = document.getElementById("live-chat");
  const closeChat = document.getElementById("close-chat");
  const chatInput = document.getElementById("chat-input-box");
  const chatMessages = document.querySelector(".chat-messages");
  const sendMessage = document.getElementById("send-message");

  // Toggle chat window visibility
  closeChat.addEventListener("click", () => {
    liveChat.style.display = liveChat.style.display === "none" ? "block" : "none";
  });

  // Handle sending messages
  sendMessage.addEventListener("click", () => {
    if (chatInput.value.trim() !== "") {
      const userMessage = document.createElement("div");
      userMessage.className = "message user";
      userMessage.textContent = chatInput.value;
      chatMessages.appendChild(userMessage);
      chatInput.value = "";

      // Simulate a bot response
      const botMessage = document.createElement("div");
      botMessage.className = "message bot";
      botMessage.textContent = "Thank you! We are connecting you to a representative.";
      setTimeout(() => chatMessages.appendChild(botMessage), 1000);
    }
  });
});


