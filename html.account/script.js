document.getElementById("accountCreationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting
    
    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
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
      const userData = { name, email };
      localStorage.setItem("userAccount", JSON.stringify(userData));
  
      // Clear form
      this.reset();
    }
  });
  