document.getElementById("accountCreationForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent default form submission

  // Collect form data
  const fullName = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;


  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || ""; 

  let errorMessage = "";

  // Validation
  if (!fullName) errorMessage += "Full name is required.\n";
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errorMessage += "Invalid email format.\n";
  if (password.length < 8) errorMessage += "Password must be at least 8 characters long.\n";
  if (password !== confirmPassword) errorMessage += "Passwords do not match.\n";

  if (errorMessage) {
    alert("Form errors:\n" + errorMessage);
    return;
  }

  // Prepare user data
  const userData = {
    email,
    password,
    firstName,
    lastName,
    role: role || "USER",
  };

  // Include additional fields if the user is a Service Provider
  if (role === "serviceProvider") {
    userData.serviceArea = document.getElementById("serviceArea").value.trim();
    userData.experience = document.getElementById("experience").value.trim();
  }

  try {
    const response = await fetch("https://roadside-assistance-api-27dbc3c52c31.herokuapp.com/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Account created successfully!");
      window.location.href = "account.html"; 
    } else {
      alert("Error: " + result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
});
