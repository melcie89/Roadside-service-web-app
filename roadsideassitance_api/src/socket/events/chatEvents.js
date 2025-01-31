const ChatMessage = require("../../models/ChatMessage");

const handleJoinRoom =
  (socket) =>
  ({ roomId }) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  };

const handleSendMessage = (io) => async (data) => {
  const { roomId, sender, message } = data;
  try {
    const chatMessage = new ChatMessage({ roomId, sender, message });
    await chatMessage.save();
    io.to(roomId).emit("receive_message", {
      sender,
      message,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error saving message:", error);
  }
};

module.exports = { handleJoinRoom, handleSendMessage };
