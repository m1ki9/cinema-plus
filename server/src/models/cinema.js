const mongoose = require('mongoose');

const { Schema } = mongoose;

const cinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;
