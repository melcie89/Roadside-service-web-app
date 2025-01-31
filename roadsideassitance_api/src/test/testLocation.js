const io = require("socket.io-client");

// Connect to the server
const socket = io("http://localhost:3000");

// Simulate user joining a room
const roomId = "test-room";
const userId = "test-user";
socket.emit("join", { roomId, userId });

// Emit location updates
setInterval(() => {
  const latitude = Math.random() * 180 - 90; // Random latitude
  const longitude = Math.random() * 360 - 180; // Random longitude

  socket.emit("share_location", {
    roomId,
    userId,
    latitude,
    longitude,
  });

  console.log(`Shared location: Latitude ${latitude}, Longitude ${longitude}`);
}, 5000); // Send location every 5 seconds

// Stop location sharing after 20 seconds
setTimeout(() => {
  socket.emit("stop_sharing_location", { roomId, userId });
  console.log("Stopped sharing location");
  socket.disconnect();
}, 20000);
