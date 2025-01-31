const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const auth = require("../middleware/authMiddleware");

// Start sharing location
router.post("/start", auth, async (req, res) => {
  try {
    const { roomId, latitude, longitude } = req.body;
    const location = new Location({
      userId: req.user._id,
      roomId,
      latitude,
      longitude,
    });
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stop sharing location
router.post("/stop", auth, async (req, res) => {
  try {
    const { roomId } = req.body;
    await Location.updateMany(
      { userId: req.user._id, roomId },
      { isActive: false }
    );
    res.status(200).json({ message: "Location sharing stopped" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get location history for a room
router.get("/history/:roomId", auth, async (req, res) => {
  try {
    const locations = await Location.find({
      roomId: req.params.roomId,
      isActive: true,
    }).sort({ timestamp: -1 });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
