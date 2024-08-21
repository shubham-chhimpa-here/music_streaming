const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AudioSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Audio', AudioSchema);
