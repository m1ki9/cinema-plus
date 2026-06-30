const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
