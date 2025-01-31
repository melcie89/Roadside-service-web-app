const Location = require("../models/Location");
const ChatMessage = require("../models/ChatMessage");

const handleReadMessage = async (socket, { messageId, roomId }) => {
  const userId = socket.user.userId;
  try {
    await ChatMessage.updateOne(
      { _id: messageId },
      { $addToSet: { readBy: userId } }
    );
    socket.to(roomId).emit("message_read", { messageId, userId });
  } catch (error) {
    console.error("Failed to mark message as read:", error);
  }
};

const handleShareLocation = async (socket, { roomId, latitude, longitude }) => {
  const locationData = {
    userId: socket.user.userId,
    roomId,
    latitude,
    longitude,
    timestamp: new Date(),
  };

  try {
    const location = new Location(locationData);
    await location.save();
    socket.to(roomId).emit("location_update", locationData);
  } catch (error) {
    console.error("Failed to save location:", error);
  }
};

module.exports = {
  handleReadMessage,
  handleShareLocation,
};
