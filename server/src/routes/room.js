const express = require('express');
const auth = require('../middlewares/auth');
const Room = require('../models/room');

const router = new express.Router();

router.post('/rooms', auth.enhance, async (req, res) => {
  const room = new Room(req.body);
  try {
    await room.save();
    res.status(201).send(room);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/rooms', async (req, res) => {
  try {
    const filter = req.query.cinemaId ? { cinemaId: req.query.cinemaId } : {};
    const rooms = await Room.find(filter);
    res.send(rooms);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.sendStatus(404);
    res.send(room);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/rooms/:id', auth.enhance, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'cinemaId', 'seats', 'seatsAvailable'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.sendStatus(404);
    updates.forEach((update) => (room[update] = req.body[update]));
    await room.save();
    res.send(room);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/rooms/:id', auth.enhance, async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.sendStatus(404);
    res.send(room);
  } catch (e) {
    res.sendStatus(400);
  }
});

module.exports = router;
