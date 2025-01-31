const Location = require("../../models/Location");

const handleShareLocation =
  (socket) =>
  async ({ roomId, latitude, longitude }) => {
    const locationData = {
      userId: socket.user?.userId,
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

module.exports = { handleShareLocation };
