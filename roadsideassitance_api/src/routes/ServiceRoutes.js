const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createService,
  acceptService,
  updateServiceStatus,
  getServiceHistory,
} = require("../controllers/ServiceController");

router.post("/request", auth, createService);
router.post("/accept/:serviceId", auth, acceptService);
router.put("/:serviceId/status", auth, updateServiceStatus);
router.get("/history", auth, getServiceHistory);

module.exports = router;
