const { io } = require("socket.io-client");

async function runTest() {
  // First login to get token
  const response = await fetch(
    "https://roadside-assistance-api-27dbc3c52c31.herokuapp.com:5000/api/v1/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@test.com",
        password: "test123",
      }),
    }
  );

  const { accessToken } = await response.json();

  const socket = io(
    "https://roadside-assistance-api-27dbc3c52c31.herokuapp.com:5000",
    {
      auth: { token: accessToken },
    }
  );

  socket.on("connect", () => {
    console.log(`Connected with ID: ${socket.id}`);
    socket.emit("join_room", "room1");

    socket.emit("send_message", {
      roomId: "room1", // Fixed property name
      sender: "TestUser",
      message: "Hello, Room!",
    });
  });

  socket.on("receive_message", (data) => {
    console.log(`Message received: ${data.message} from ${data.sender}`);
  });
}

runTest();
