const io = require("socket.io-client");
const jwt = require("jsonwebtoken");
const { createServer } = require("http");
const { Server } = require("socket.io");
const User = require("../../models/User");

describe("Socket Service", () => {
  let clientSocket;
  let httpServer;
  let ioServer;
  let token;

  beforeAll(async () => {
    httpServer = createServer();
    ioServer = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      token = jwt.sign({ id: "testuser" }, process.env.JWT_SECRET);
      clientSocket = io(
        `https://roadside-assistance-api-27dbc3c52c31.herokuapp.com:${port}`,
        {
          auth: { token },
        }
      );
    });
  });

  afterAll(() => {
    ioServer.close();
    clientSocket.close();
    httpServer.close();
  });

  test("should connect and join room", (done) => {
    clientSocket.emit("join_room", { roomId: "test-room" });
    clientSocket.on("connect", () => {
      expect(clientSocket.connected).toBe(true);
      done();
    });
  });

  test("should send and receive message", (done) => {
    clientSocket.emit("send_message", {
      roomId: "test-room",
      sender: "testuser",
      message: "test message",
    });

    // Wait for the message to be received

    clientSocket.on("receive_message", (data) => {
      expect(data.message).toBe("test message");
      expect(data.sender).toBe("testuser");
      done();
    });
  });
});
