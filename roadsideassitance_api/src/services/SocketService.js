const socketAuth = require("../socket/middleware/auth");
const {
  handleJoinRoom,
  handleSendMessage,
} = require("../socket/events/chatEvents");
const { handleShareLocation } = require("../socket/events/locationEvents");

class SocketService {
  constructor(io) {
    this.io = io;
    this.setupMiddleware();
    this.setupEventHandlers();
  }

  setupMiddleware() {
    this.io.use(socketAuth);
  }

  setupEventHandlers() {
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("join_room", handleJoinRoom(socket));
      socket.on("send_message", handleSendMessage(this.io));
      socket.on("share_location", handleShareLocation(socket));

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }
}

module.exports = SocketService;
