const Location = require("../models/Location");
const ChatMessage = require("../models/ChatMessage");
const Service = require("../../models/Service");

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

//updated event to handle request for service
const handleServiceRequest = (socket) => async (data) => {
  try {
    const { serviceID, location, type } = data;

    // Broadcast to nearby service providers
    socket.broadcast.emit("new_service_request", {
      serviceID,
      location,
      type,
    });
  } catch (error) {
    console.error("Error handling service request:", error);
  }
};

const handleServiceAcceptance = (socket) => async (data) => {
  try {
    const { serviceID, providerID } = data;
    const service = await Service.findOne({ serviceID });

    if (service) {
      socket.to(service.requester.toString()).emit("service_accepted", {
        serviceID,
        providerID,
      });
    }
  } catch (error) {
    console.error("Error handling service acceptance:", error);
  }
};

module.exports = {
  handleReadMessage,
  handleShareLocation,
  handleServiceRequest,
  handleServiceAcceptance,
};
