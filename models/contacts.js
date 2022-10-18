const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  snaNumber: {
    type: String,
    required: true
  },
  snaName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Contact', contactSchema);
