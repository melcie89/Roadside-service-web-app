const User = require('../models/User');

// Get Service History
exports.getServiceHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('serviceHistory.serviceId');
    res.status(200).json(user.serviceHistory);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Delete Service History Record
exports.deleteServiceHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    user.serviceHistory = user.serviceHistory.filter(record => record._id.toString() !== id);
    await user.save();
    res.status(200).json({ message: 'Service history record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
