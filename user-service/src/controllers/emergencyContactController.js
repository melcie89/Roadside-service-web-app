const User = require('../models/User');

// Get Emergency Contacts
exports.getContacts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user.emergencyContacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Add Emergency Contact
exports.addContact = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user.id);
    user.emergencyContacts.push({ name, phone });
    await user.save();
    res.status(201).json(user.emergencyContacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Update Emergency Contact
exports.updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const updates = req.body;
    const user = await User.findById(req.user.id);
    const contact = user.emergencyContacts.id(contactId);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    Object.assign(contact, updates);
    await user.save();
    res.status(200).json(user.emergencyContacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Delete Emergency Contact
exports.deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const user = await User.findById(req.user.id);
    user.emergencyContacts.id(contactId).remove();
    await user.save();
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
