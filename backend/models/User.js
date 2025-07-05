const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['doctor', 'patient'] }
});
module.exports = mongoose.model('User', userSchema);
