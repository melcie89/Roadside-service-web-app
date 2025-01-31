const io = require("socket.io-client");
const axios = require("axios");

const API_URL = "http://localhost:5000/api";
let token;
let socket;

// Test server connection
async function testConnection() {
  try {
    await axios.get(API_URL);
    console.log("Server is running");
    return true;
  } catch (error) {
    console.error("Server not running:", error.message);
    return false;
  }
}

async function cleanup() {
  try {
    // Delete test user if exists
    if (token) {
      await axios.delete(`${API_URL}/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.error("Cleanup error:", error.message);
  }
}

async function testAuth() {
  try {
    const isServerRunning = await testConnection();
    if (!isServerRunning) return;

    // Use same email for register and login
    const testEmail = "testuser@test.com";

    console.log("Starting registration test...");
    const registerRes = await axios.post(`${API_URL}/v1/auth/register`, {
      email: testEmail,
      password: "test123",
      firstName: "Test",
      lastName: "User",
    });
    console.log("Registration response:", registerRes.data);

    console.log("Starting login test...");
    const loginRes = await axios.post(`${API_URL}/v1/auth/login`, {
      email: testEmail,
      password: "test123",
    });
    console.log("Login response:", loginRes.data);
    token = loginRes.data.accessToken;

    if (!token) {
      throw new Error("No token received from login");
    }

    // Test socket connection
    socket = io("http://localhost:5000", {
      auth: { token },
      reconnection: false,
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully");
      testLocationSharing();
    });
  } catch (error) {
    console.error("Test failed:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
  } finally {
    await cleanup();
    if (socket) {
      socket.disconnect();
    }
  }
}

function testLocationSharing() {
  socket.emit("share_location", {
    roomId: "test-room",
    latitude: 1.234,
    longitude: 4.567,
  });

  socket.on("location_update", (data) => {
    console.log("Location update received:", data);
  });
}

console.log("Starting integration tests...");
testAuth();
