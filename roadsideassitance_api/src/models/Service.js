const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    serviceID: { type: String, required: true, unique: true },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      required: true,
      enum: ["TOWING", "REPAIR", "FUEL_DELIVERY", "TIRE_CHANGE", "JUMP_START"],
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: { type: String },
    },
    description: { type: String },
    timestamp: { type: Date, default: Date.now },
    timestampOfAcceptance: { type: Date },
    completionTime: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
