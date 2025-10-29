const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  email: String,
  event: String
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
