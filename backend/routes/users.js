const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/doctors', auth, async (req, res) => {
  const doctors = await User.find({ role: 'doctor' });
  res.json(doctors);
});

router.get('/patients', auth, async (req, res) => {
  const patients = await User.find({ role: 'patient' });
  res.json(patients);
});

module.exports = router;
