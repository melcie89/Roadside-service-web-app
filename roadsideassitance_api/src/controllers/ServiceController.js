const Service = require("../models/Service");
const User = require("../models/User");

exports.createService = async (req, res) => {
  try {
    const { type, location, description } = req.body;
    const serviceID = `SRV-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const service = new Service({
      serviceID,
      requester: req.user.id,
      type,
      location,
      description,
    });

    await service.save();

    // Emit socket event for nearby service providers
    req.io.emit("new_service_request", {
      serviceID: service.serviceID,
      location: service.location,
      type: service.type,
    });

    res.status(201).json({ message: "Service request created", service });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating service request",
        error: error.message,
      });
  }
};

exports.acceptService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findOne({ serviceID: serviceId });

    if (!service) {
      return res.status(404).json({ message: "Service request not found" });
    }

    if (service.status !== "PENDING") {
      return res
        .status(400)
        .json({ message: "Service request is no longer available" });
    }

    service.provider = req.user.id;
    service.status = "ACCEPTED";
    service.timestampOfAcceptance = new Date();
    await service.save();

    // Notify requester
    req.io.to(service.requester.toString()).emit("service_accepted", {
      serviceID: service.serviceID,
      provider: req.user.id,
    });

    res.json({ message: "Service request accepted", service });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error accepting service request",
        error: error.message,
      });
  }
};

exports.updateServiceStatus = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { status } = req.body;
    const service = await Service.findOne({ serviceID: serviceId });

    if (!service) {
      return res.status(404).json({ message: "Service request not found" });
    }

    if (service.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    service.status = status;
    if (status === "COMPLETED") {
      service.completionTime = new Date();
    }
    await service.save();

    // Notify requester
    req.io.to(service.requester.toString()).emit("service_status_update", {
      serviceID: service.serviceID,
      status,
    });

    res.json({ message: "Service status updated", service });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating service status", error: error.message });
  }
};

exports.getServiceHistory = async (req, res) => {
  try {
    const services = await Service.find({
      $or: [{ requester: req.user.id }, { provider: req.user.id }],
    }).sort({ timestamp: -1 });

    res.json(services);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching service history",
        error: error.message,
      });
  }
};
