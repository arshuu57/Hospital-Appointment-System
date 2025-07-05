const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { doctorId, date } = req.body;
  const appointment = new Appointment({
    patientId: req.user.id,
    doctorId,
    date
  });
  await appointment.save();
  res.status(201).send('Appointment booked');
});

router.get('/', auth, async (req, res) => {
  const appointments = await Appointment.find({
    $or: [
      { patientId: req.user.id },
      { doctorId: req.user.id }
    ]
  }).populate('doctorId patientId');
  res.json(appointments);
});

router.delete('/:id', auth, async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
  res.send('Appointment cancelled');
});

module.exports = router;
